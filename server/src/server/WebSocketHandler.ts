import { ConnectionType, INACTIVE_CHANNEL } from '@edge-computing/connections';
import {
  ConnectedCountProps,
  ConnectedCountType,
  ConnectType,
  DisconnectType,
  WorkDoneProps,
  WorkDoneType,
  WorkNewProps,
  WorkNewType,
} from '@edge-computing/events';
import http from 'http';
import socketIO from 'socket.io';

import { workDone } from './websockets/workDone';
import { workNew } from './websockets/workNew';

type WSMethodHandler = (socket: SocketIO.Socket) => void;

interface WSMethods {
  method: string;
  handler: WSMethodHandler;
};

interface WebSocketQuery {
  id: string;
};

let clients: {[key: string]: string} = {};

class WebSocketHandler {
  private readonly io: SocketIO.Server;
  private connected = 0;
  private handlers: WSMethods[] = []

  constructor(server: http.Server) {
    this.io = socketIO(server);

    this.io.of(ConnectionType.WORKER).on(ConnectType, (socket: SocketIO.Socket) =>
      this.onWorkerConnect(socket, socket.handshake.query)
    );

    this.io.of(ConnectionType.CLIENT).on(ConnectType, (socket: SocketIO.Socket) =>
      this.onClientConnect(socket, socket.handshake.query)
    );

    this.io.use((socket, next) => this.middleware(socket, next));
  }

  public on(method: string, handler: WSMethodHandler) {
    this.handlers.push({method, handler});
  }

  private async middleware(socket: SocketIO.Socket, next: (err?: any) => void) {
    if ('id' in socket.handshake.query) {
      return next();
    }
    console.error('Received an invalid WebSocket request.');
    return next(new Error('Request is invalid'));
  }

  public async onUpload(id: string) {
    console.info(`[${id}] A new config has been uploaded`);
    this.io.of(ConnectionType.WORKER).to(INACTIVE_CHANNEL).send(WorkNewType, {
      id
    } as WorkNewProps);
  }

  public async onWorkDone(id: string) {
    console.info(`[${id}] A new block is now finished`);
    this.io.of(ConnectionType.CLIENT).to(id).emit(WorkDoneType, {
      id
    } as WorkDoneProps);
  }

  private async sendConnectedCount(roomID: string, socket?: SocketIO.Socket) {
    const room = this.io.of(ConnectionType.WORKER).to(roomID);

    const params: ConnectedCountProps = {
      count: room === undefined ? 0 : Object.keys(room.sockets).length
    };

    if (socket !== undefined) {
      socket.emit(ConnectedCountType, params);
    } else {
      this.io.of(ConnectionType.WORKER).to(roomID).emit(ConnectedCountType, params);
      this.io.of(ConnectionType.CLIENT).to(roomID).emit(ConnectedCountType, params);
    }
  }

  private async onClientConnect(socket: socketIO.Socket, query: WebSocketQuery) {
    await this.onConnect(socket, query);
    socket.join(query.id, () => {
      this.sendConnectedCount(query.id, socket);
      console.info(`[${++this.connected}] Client connected in room ${query.id}`);
    });
  }

  private async onWorkerConnect(socket: socketIO.Socket, query: WebSocketQuery) {
    await this.onConnect(socket, { id: INACTIVE_CHANNEL });
    socket.join(INACTIVE_CHANNEL, () => {
      clients[socket.id] = INACTIVE_CHANNEL;

      socket.on(WorkNewType, (data: WorkNewProps) => {
        workNew(socket, data);
        clients[socket.id] = data.id;
        this.sendConnectedCount(data.id);
      });
      socket.on(WorkDoneType, (data: WorkDoneProps) => {
        workDone(socket);
        clients[socket.id] = INACTIVE_CHANNEL;
        this.sendConnectedCount(data.id);
      });
      console.info(`[${++this.connected}] New worker connected`);
    });
  }

  private async onConnect(socket: socketIO.Socket, query: WebSocketQuery) {
    socket.leaveAll();
    socket.on(DisconnectType, () =>
      this.onDisconnect(socket)
    );

    this.handlers.map((handler) => {
      if (handler.method === ConnectType) {
        handler.handler(socket);
      } else {
        socket.on(handler.method, handler.handler);
      }
    });
  }

  private async onDisconnect(socket: SocketIO.Socket) {
    if (socket.nsp.name === ConnectionType.WORKER && clients[socket.id] !== undefined) {
      this.sendConnectedCount(clients[socket.id]);
      delete clients[socket.id];
    }
    console.info(`[${--this.connected}] disconnected`);
  }
};

export default WebSocketHandler;
