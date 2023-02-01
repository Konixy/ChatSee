import type { IronSessionOptions } from 'iron-session';
import type { APIUser } from '@/types';
import config from '@/config';
import { NextApiHandler } from 'next/types';
import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: APIUser;
  }
}

const sessionOptions: IronSessionOptions = {
  cookieName: 'login_uid',
  password: config.cookiePwd,
  cookieOptions: {
    secure: config.prod,
  },
};

export default function withSession(handler: NextApiHandler<any>) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
