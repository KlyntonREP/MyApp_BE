import mongoose from 'mongoose';
import log from '../utility/logger';
import config from './environmentVariables';

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const URI: any = config.DB_URL as string;
        await mongoose.connect(URI);

        log.info(`MongoDB Connected`);
    } catch (error) {
        log.info('There is an error in the database', error);
        process.exit(1);
    }
};

export default connectDB;
