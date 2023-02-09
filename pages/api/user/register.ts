import database from 'lib/database';
import withSession from 'lib/session';

export default withSession(async (req, res) => {
  if (req.method !== 'POST') return res.status(404);
  if (
    !req.body ||
    !req.body.username.match(/^(?=.{4,16}$)[a-zA-Z0-9._-]+$/g) ||
    !req.body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi)
  )
    return res.send({ success: false, message: 'invalid request body' });
  console.log(req.body);
  database
    .findOne({ email: req.body.email, password: req.body.password })
    .then(async (findedUser) => {
      if (findedUser) return res.send({ success: false, message: 'user allready exist' });
      const newUser = req.body;
      newUser._id = new Date().valueOf();
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

// json data test

// {
//   "email": "example@gmail.com",
//   "password": "test123",
//   "fullname": "Anatole Dufour",
//   "username": "Konixy",
//   "avatarUrl": "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
// }
