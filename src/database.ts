import mongoose from 'mongoose';
import schema from './databaseSchema';

const database = new mongoose.model('user', schema);
