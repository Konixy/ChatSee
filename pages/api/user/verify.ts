import { NextApiRequest, NextApiResponse } from 'next';
import { sendVerifyEmail } from 'lib/mail';
import { nanoid } from 'nanoid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user: { email: string; fullname: string } = req.body.user;
  if (!user.email || !user.fullname) return res.send({ success: false, message: 'invalid form body' });
  const code = nanoid();
  sendVerifyEmail({ username: user.fullname, to: user.email, code });
}
