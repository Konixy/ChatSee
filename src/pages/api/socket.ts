import { MessageType, NextApiResponseWithSocket } from '@/types';
import { NextApiRequest } from 'next';
import { Server } from 'socket.io';

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      console.log('a user is connected');
      socket.on('submit', (e: MessageType) => {
        socket.broadcast.emit('message', e);
        console.log('submitted', e);
      });
      socket.on('message', (e) => console.log('a message arrived', e));
    });
  }
  res.end();
}
