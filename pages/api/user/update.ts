import database from 'lib/database';
import withSession from 'lib/session';

export default withSession(async (req, res) => {
  if (!req.body) return res.send({ success: false, message: 'invalid request body' });
  if (!req.session.user) return res.send({ success: false, message: 'user not logged in' });
  console.log(req.body);
  database
    .findOneAndDelete({ email: req.body.email, password: req.body.password })
    .then(async () => {
      const newUser = req.body;
      newUser._id = req.session.user?._id;
      await (await database.create(newUser)).save();
      const { password, ...user } = newUser;
      console.log(user);
      req.session.user = user;
      await req.session.save();
      res.send({ success: true, user });
    })
    .catch((e) => {
      console.log(e);
      res.send({ success: false, message: e.message });
    });
});
