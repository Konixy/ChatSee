import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(404);
  const data = await database.findOne({ username: req.body.username });
  if (data) return res.send({ result: true });
  else return res.send({ result: false });
}
