import { ConnectionType, INACTIVE_CHANNEL } from '@edge-computing/connections';
import { WorkNewType } from '@edge-computing/events';
import { Socket } from 'socket.io';
import SocketIO from 'socket.io-client';

import Camera from './Camera';
import { updateBlock } from './Client';
import { StatusInterface } from './Interfaces/Status';
import readScene from './Parser';
import Scene from './Scene';
import Vector from './Vector';
import { workNew } from './websockets';

const status: StatusInterface = { working: false };

const io = SocketIO(`http://localhost:3000${ConnectionType.WORKER}`, {
  query: {
    id: INACTIVE_CHANNEL,
  },
});

io.on(WorkNewType, (socket: Socket) => workNew(socket, socket.handshake.query, status));

function startNewScene() {
  if (status.block === undefined) {
    console.error('config is invalid');
    return;
  }

  const config: any = JSON.parse(status.block.scene.config);

  const from = new Vector(config.camera.from.x, config.camera.from.y, config.camera.from.z);
  const at = new Vector(config.camera.at.x, config.camera.at.y, config.camera.at.z);
  const vUp = new Vector(config.camera.vUp.x, config.camera.vUp.y, config.camera.vUp.z);
  const camera = new Camera(from, at, vUp, config.camera.vFov, config.width / config.height,
                            config.camera.aperture,
                            (from.clone().sub(at)).magnitude(), config.camera.t0, config.camera.t1);

  const scene = new Scene(config.width, config.height, config.depth);
  const shapes = readScene(JSON.parse(status.block.scene.config));

  const canvas = scene.renderBlock(camera, shapes, status.block.x, status.block.y, status.block.size);

  if (canvas === undefined) {
    console.error('An error occured during rendering');
  } else {
    updateBlock({ data: canvas.toDataURL(), id: parseInt(status.block.id.toString(), 10) });
    console.log('Work is finished!');
  }
}

export function startWorking() {
  if (status.working) {
    return;
  }

  io.emit(WorkNewType, { id: '123' });
  console.error('Sent event!');
  return;

  // const response = await getNewBlock();

  // if (response === undefined || (response.data as BlockQuery).newBlock === null) {
  //   console.log('There is no new block');
  //   return;
  // }

  // status.working = true;

  // if (status.block === undefined) {
  //   io.emit(WorkNewType, {
  //     id: (response.data as BlockQuery).newBlock.scene.id.toString(),
  //   } as WorkNewProps);
  // } else if (status.block.scene.id !== (response.data as BlockQuery).newBlock.scene.id) {
  //   io.emit(WorkDoneType, {
  //     id: status.block.id.toString(),
  //   } as WorkDoneProps);
  //   io.emit(WorkNewType, {
  //     id: (response.data as BlockQuery).newBlock.scene.id.toString(),
  //   } as WorkNewProps);
  // }

  // status.block = (response.data as BlockQuery).newBlock;

  // console.log('Received new block');

  // try {
  //   startNewScene();
  // } catch (err) {
  //   console.error('An error occured. ', err);
  // }

  // status.working = false;

  // return startWorking();
}

setInterval(startWorking, 10000);

startWorking();
