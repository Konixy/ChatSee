import database from 'lib/database';
import cookies from 'lib/cookies';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.send('test');
// }

import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(async (req, res) => {
  if (!req.body) return res.send({ success: false, message: 'invalid request body' });

  await req.session.save();
  res.send({ ok: true });
}, cookies);
