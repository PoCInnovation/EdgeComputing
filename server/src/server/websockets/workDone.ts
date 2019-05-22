import { INACTIVE_CHANNEL } from '@edge-computing/connections';
import { Socket } from 'socket.io';

export const workDone = (socket: Socket) => {
  socket.leaveAll();
  socket.join(INACTIVE_CHANNEL);
};
