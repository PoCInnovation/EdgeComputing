import { WorkNewProps } from '@edge-computing/events';
import { Socket } from 'socket.io';

import { startWorking } from '.';
import { StatusInterface } from './Interfaces/Status';

export const workNew = (socket: Socket, query: WorkNewProps, status: StatusInterface) => {
  console.log('A new scene has been uploaded');

  if (!status.working) {
    startWorking();
  }
};
