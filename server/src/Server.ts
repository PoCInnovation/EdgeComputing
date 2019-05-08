import express from 'express';
import http from 'http';

import WebSocketHandler from './Views/WebSocketHandler';
import Events from './Config/Events';

interface HTTPServerProps {
  port: number | string;
  hostname?: string;
};

class HTTPServer {
  private readonly port: number;
  private readonly app: express.Application;
  private readonly server: http.Server;
  private readonly hostname?: string;
  public readonly wsHandler: WebSocketHandler;

  constructor(props: HTTPServerProps) {
    this.port = Number(props.port);
    this.hostname = props.hostname;
    this.app = express();
    this.server = new http.Server(this.app);
    this.wsHandler = new WebSocketHandler(this.server);
  }

  use(handler: express.RequestHandler) {
    this.app.use(handler);
  }

  listen() {
    this.server.listen(this.port, this.hostname, () =>
      console.log(`Listening on port ${this.port}!`)
    );
  }
};

export default HTTPServer;
