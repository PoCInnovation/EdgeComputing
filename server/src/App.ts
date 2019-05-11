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

  server.app.use(compression());
  server.app.use(helmet());
  server.app.use(morgan('short'));

  server.app.get('/', (req, res) => {
    res.send(server.wsHandler.getConnected());
  });

  server.wsHandler.on(ConnectType, (socket) => {
    console.error('this is a simple test!');

    socket.emit(WorkNewType, 'get a job!');

    socket.on(WorkDoneType, (socket) =>
      console.log('WORK IS FINISHED!')
    );
  });

  server.listen(process.env.PORT || 3000, '127.0.0.1');

}).catch(error => console.error(error));
