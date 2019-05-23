import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import ApolloHandler from './ApolloHandler';
import WebSocketHandler from './WebSocketHandler';

class HTTPServer {
  public readonly app: express.Application;
  private readonly server: http.Server;
  public readonly wsHandler: WebSocketHandler;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);
    this.wsHandler = new WebSocketHandler(this.server);

    this.app.use(bodyParser.json({ limit: '2mb' }));

    ApolloHandler(this.app, {
      onUpload: (id: string) => this.wsHandler.onUpload(id)
    });
  }

  listen(port: number | string, hostname?: string) {
    this.server.listen(Number(port), hostname, () =>
      console.log(`Listening on port http://${hostname ? hostname : '0.0.0.0'}:${port}/`)
    );
  }
};

export default HTTPServer;
