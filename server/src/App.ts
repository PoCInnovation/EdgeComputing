import 'reflect-metadata';

import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

import Server from './server';

useContainer(Container);

// process.setMaxListeners(0);

createConnection().then(async connection => {
  const server = new Server();

  server.app.use(compression());
  server.app.use(helmet());
  server.app.use(morgan('short'));
  server.app.use(cors({
    credentials: true,
    origin: 'http://localhost:9000'
  }));

  server.listen(process.env.PORT || 3000, '0.0.0.0');

}).catch(error => console.error(error));
