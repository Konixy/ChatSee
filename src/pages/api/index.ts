import { NextApiRequest, NextApiResponse } from 'next';
import * as IronSession from 'iron-session';
import { APIUser } from '@/types';

declare module 'iron-session' {
  interface IronSessionData {
    user?: APIUser;
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.statusCode = 200;
  res.send({ message: 'invalid request', success: false });
}
