import config from './config';

export default {
  cookieName: 'login_uid',
  password: config.cookiePwd,
  cookieOptions: {
    secure: config.prod,
  },
};
