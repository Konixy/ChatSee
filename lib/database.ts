import mongoose from 'mongoose';
import schema from './databaseSchema';
import config from 'lib/config';

mongoose.connect(config.mongoDbUri).then(() => console.log('mongodb connected'));

export default mongoose.models.user || mongoose.model('user', schema);
