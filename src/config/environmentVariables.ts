import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    BASE_URL: process.env.BASE_URL,
    AUTH_EMAIL: process.env.AUTH_EMAIL,
    AUTH_PASS: process.env.AUTH_PASS,
    TWILO_ACCOUNT_SID: process.env.TWILO_ACCOUNT_SID,
    TWILO_AUTH_TOKEN: process.env.TWILO_AUTH_TOKEN,
    SMS_NUMBER: process.env.SMS_NUMBER,
    MAX_GROUP_NUMBER: process.env.MAX_GROUP_NUMBER,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
};
