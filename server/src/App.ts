import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

import Server from './Server';
import Events from './Config/Events';

const server = new Server({ port: process.env.PORT || 3000 });

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

server.listen();


// Database
//   .authenticate()
//   .then(() => {
//     console.info('Successfuly connected to dabase.');
//     init();
//   }).catch((err) => {
//     console.error('Failed to connect to database. Error: ', err);
//     process.exit(1);
//   });
