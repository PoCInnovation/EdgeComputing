import { ConnectionType, INACTIVE_CHANNEL } from '@edge-computing/connections';
import {
  ConnectedCountProps,
  ConnectedCountType,
  ConnectType,
  DisconnectType,
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
    if (!('id' in socket.handshake.query)) {
      return next();
    }
    console.error('Received an invalid WebSocket request.');
    return next(new Error('Request is invalid'));
  }

  public async onUpload(id: string) {
    this.io.of(ConnectionType.WORKER).to(INACTIVE_CHANNEL).send(WorkNewType, {
      id
    } as WorkNewProps);
  }

  private async sendConnectedCount(roomID: string, socket?: SocketIO.Socket) {
    const room = this.io.of(ConnectionType.WORKER).adapter.rooms[roomID];
    const params: ConnectedCountProps = {
      count: room !== undefined ? room.length : 0
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
      this.on(WorkNewType, (socket) => workNew(socket, socket.handshake.query));
      this.on(WorkDoneType, (socket) => workDone(socket, socket.handshake.query));
      console.info(`[${++this.connected}] New worker connected`);
    });
  }

  private async onConnect(socket: socketIO.Socket, query: WebSocketQuery) {
    socket.leaveAll();
    socket.on(DisconnectType, () =>
      this.onDisconnect(query.id, socket.nsp.name)
    );

    this.handlers.map((handler) => {
      if (handler.method === ConnectType) {
        handler.handler(socket);
      } else {
        socket.on(handler.method, handler.handler);
      }
    });
  }

  private async onDisconnect(roomID: string, namespace: string) {
    if (namespace === ConnectionType.WORKER) {
      this.sendConnectedCount(roomID);
    }
    console.info(`[${--this.connected}] ${namespace} disconnected`);
  }
};

export default WebSocketHandler;
