import database from 'lib/database';
import withSession from 'lib/session';

export default withSession(async (req, res) => {
  if (!req.body) return res.send({ success: false, message: 'invalid request body' });

  await req.session.save();
  res.send({ ok: true });
});
