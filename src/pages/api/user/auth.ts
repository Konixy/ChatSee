import { NextApiRequest, NextApiResponse } from 'next';
import config from '@/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.send('test');
}
