import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await database.findOne({ email: req.body.email });
  if (data) return res.send({ result: true });
  else return res.send({ result: false });
}
