import http from 'http';
import socketIO from 'socket.io';

import { ConnectType, DisconnectType } from '../events';

type WSMethodHandler = (socket: SocketIO.Socket) => void;

interface WSMethods {
  method: string;
  handler: WSMethodHandler;
};

class WebSocketHandler {
  private readonly io: SocketIO.Server;
  private workers = 0;
  private handlers: WSMethods[] = []

  constructor(server: http.Server) {
    this.io = socketIO(server);
    this.io.on(ConnectType, (socket: SocketIO.Socket) =>
      this.onConnect(socket)
    );
  }

  public on(method: string, handler: WSMethodHandler) {
    this.handlers.push({method, handler});
  }

  private onConnect(socket: socketIO.Socket) {
    this.workers += 1;

    socket.on(DisconnectType, (socket: SocketIO.Socket) =>
      this.onDisconnect(socket)
    );

    this.handlers.map((handler) => {
      if (handler.method === ConnectType) {
        handler.handler(socket);
      } else {
        socket.on(handler.method, handler.handler);
      }
    });

    console.info(`[${this.workers}] Worker connected`);
  }

  private onDisconnect(socket: SocketIO.Socket) {
    this.workers -= 1;

    console.info(`[${this.workers}] Worker disconnected`);
  }
};

export default WebSocketHandler;
