import { WorkNewProps } from '@edge-computing/events/';
import { Socket } from 'socket.io';

export const workNew = (socket: Socket, query: WorkNewProps) => {
  socket.leaveAll();
  socket.join(query.id);
};
