import express from 'express';
import http from 'http';

import WebSocketHandler from './WebSocketHandler';

class HTTPServer {
  private readonly app: express.Application;
  private readonly server: http.Server;
  public readonly wsHandler: WebSocketHandler;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);
    this.wsHandler = new WebSocketHandler(this.server);
  }

  use(handler: express.RequestHandler) {
    this.app.use(handler);
  }

  listen(port: number | string, hostname?: string) {
    this.server.listen(Number(port), hostname, () =>
      console.log(`Listening on port ${port}!`)
    );
  }
};

export default HTTPServer;
