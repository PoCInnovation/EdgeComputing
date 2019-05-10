import 'reflect-metadata';

import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

import { ConnectType, WorkDoneType, WorkNewType } from './events';
import Server from './server';

useContainer(Container);

createConnection().then(async connection => {
  const server = new Server();

  server.use(compression());
  server.use(helmet());
  server.use(morgan('short'));

  server.wsHandler.on(ConnectType, (socket) => {
    console.error('this is a simple test!');

    socket.emit(WorkNewType, 'get a job!');

    socket.on(WorkDoneType, (socket) =>
      console.log('WORK IS FINISHED!')
    );
  });

  server.listen(process.env.PORT || 3000, '127.0.0.1');

}).catch(error => console.error(error));
