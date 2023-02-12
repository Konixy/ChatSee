import database from 'lib/database';
import withSession from 'lib/session';

export default withSession(async (req, res) => {
  if (req.method !== 'POST') return res.status(404);
  if (!req.body || !req.body.email || !req.body.password)
    return res.send({ success: false, message: 'invalid request body' });
  console.log(req.body);
  const findedUser = await database.findOne({ email: req.body.email, password: req.body.password });
  if (!findedUser) return res.send({ success: false, message: 'unknown user' });
  const { password, ...user } = findedUser._doc;
  console.log(user);
  req.session.user = user;
  await req.session.save();
  res.send({ success: true, user });
});
