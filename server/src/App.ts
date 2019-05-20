import 'reflect-metadata';

import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

import Server from './server';

useContainer(Container);

createConnection().then(async connection => {
  const server = new Server();

  server.app.use(compression());
  server.app.use(helmet());
  server.app.use(morgan('short'));

  server.listen(process.env.PORT || 3000, '0.0.0.0');

}).catch(error => console.error(error));
