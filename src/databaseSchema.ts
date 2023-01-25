import { Schema } from 'mongoose';

export default new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});
