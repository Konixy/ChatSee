import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.statusCode = 200;
  res.send({ message: 'invalid request', success: false });
}
