import otpGenerator from 'otp-generator';
import config from '../config/environmentVariables';
import nodemailer from 'nodemailer';
import log from './logger';
import { OtpModel } from '../models';
import bcrypt from 'bcryptjs';
import cron from 'node-cron';

// this fuction generates a randow string of length === 32
// export function generateReference(length = 32, chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
//   let result = '';
//   for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//   return result;
// }

// Random code generator(generates 6 random numbers)
export const GenCode = async () => {
    return otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
};

// Mailer helper
export const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.AUTH_EMAIL,
        pass: config.AUTH_PASS,
    },
});

export const sendMail = async (name: string, email: string, subject: string, message: string) => {
    try {
        const mailOptions = {
            from: config.AUTH_EMAIL,
            to: email,
            subject,
            html: message,
        };
        return transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                log.info('Error occurred while sending email:', error);
            } else {
                log.info('Email sent successfully!', info.response);
            }
        });
    } catch (error: any) {
        log.error(error.message);
    }
};

// Otp generator helper(encrypts the generated code and stores in in our db)
export const generateAndStoreOTP = async (userEmail: string) => {
    try {
        const findOtp = await OtpModel.findOne({ userEmail });

        const genOtp = await GenCode();
        const hashOtp = await bcrypt.hash(genOtp, 12);

        if (findOtp) {
            findOtp.otp = hashOtp;
            await findOtp.save();
        } else {
            await OtpModel.create({
                otp: hashOtp,
                userEmail,
            });
        }
        return genOtp;
    } catch (error: any) {
        console.error('Error generating and storing OTP:', error);
        return { message: error.message };
    }
};

// cron job to check the database every 1min for expired OTPs and delete them
cron.schedule('*/1 * * * *', async () => {
    try {
        // Calculate the time 5 minutes ago
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

        // Find and delete OTPs created more than 5 minutes ago
        const result = await OtpModel.deleteMany({ updatedAt: { $lt: fiveMinutesAgo } });

        if (result.deletedCount > 0) {
            log.info('Deleted expired OTPs successfully.');
        }
    } catch (error) {
        console.error('Error deleting expired OTPs:', error);
    }
});
