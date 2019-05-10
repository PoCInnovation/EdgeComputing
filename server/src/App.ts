import 'reflect-metadata';
import { createConnection } from 'typeorm';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import Server from './Server';
import Events from './Config/Events';

createConnection().then(async connection => {
  const server = new Server();

  server.use(compression());
  server.use(helmet());
  server.use(morgan('short'));

  server.wsHandler.on(Events.connection, (socket) => {
    console.error('this is a simple test!');

    socket.emit(Events.new, 'find a work!');

    socket.on(Events.done, (socket) => {
      console.log('WORK IS FINISHED!');
    });
  });

  server.listen(process.env.PORT || 3000, '127.0.0.1');

}).catch(error => console.log(error));
