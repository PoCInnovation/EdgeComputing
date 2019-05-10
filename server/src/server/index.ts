import express from 'express';
import http from 'http';

import ApolloHandler from './ApolloHandler';
import WebSocketHandler from './WebSocketHandler';

class HTTPServer {
  private readonly app: express.Application;
  private readonly server: http.Server;
  public readonly wsHandler: WebSocketHandler;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);
    this.wsHandler = new WebSocketHandler(this.server);

    ApolloHandler(this.app);
  }

  use(handler: express.RequestHandler) {
    this.app.use(handler);
  }

  listen(port: number | string, hostname?: string) {
    this.server.listen(Number(port), hostname, () =>
      console.log(`Listening on port http://${hostname ? hostname : '0.0.0.0'}:${port}/!`)
    );
  }
};

export default HTTPServer;
