import type { Server as HTTPServer } from 'http';
import type { NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export type MessageType = {
  id: string;
  convId?: string;
  content: string;
  sender: string;
  loading?: boolean;
};
export type Conv = MessageType[];

export type APIUserWithPassword = APIUser & { password: string };

export type APIUser = {
  _id: string;
  username: string;
  avatarUrl?: string;
  email: string;
  online: boolean;
  fullname: string;
};
