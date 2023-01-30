import mongoose from 'mongoose';
import schema from './databaseSchema';
import config from 'lib/config';

const database = mongoose.model('user', schema);

mongoose.connect(config.mongoDbUri).then(() => console.log('mongodb connected'));

export default database;
