import 'reflect-metadata';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import { Container } from 'typedi';
import { createConnection, useContainer } from 'typeorm';

import Config from './config';
import Server from './server';

useContainer(Container);

fs.mkdir(Config.FILES_DIR, { recursive: true }, (err) => {
  if (err) throw err;
});

createConnection().then(async connection => {
  const server = new Server();

  server.app.use(compression());
  server.app.use(helmet());
  server.app.use(morgan('short'));
  server.app.use('/files', express.static(Config.FILES_DIR));
  server.app.use(cors({
    credentials: true,
    origin: true
  }));

  server.listen(process.env.PORT || 3000, '0.0.0.0');

}).catch(error => console.error(error));
