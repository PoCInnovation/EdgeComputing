import { INACTIVE_CHANNEL } from '@edge-computing/connections';
import { WorkDoneProps } from '@edge-computing/events/';
import { Socket } from 'socket.io';

export const workDone = (socket: Socket, query: WorkDoneProps) => {
  socket.leaveAll();
  socket.join(INACTIVE_CHANNEL);
};
