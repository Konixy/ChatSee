import withSession from 'lib/session';

export default withSession(async (req, res) => {
  if (!req.session.user) return res.send({ success: false, message: 'user not logged in' });
  req.session.destroy();
  res.send({ success: true });
});
