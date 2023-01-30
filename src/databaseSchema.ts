import { Schema } from 'mongoose';
import { APIUserWithPassword } from './types';

export default new Schema<APIUserWithPassword>({
  id: {
    type: String,
    required: true,
  },
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
