import { UserModel, OtpModel } from '../models/index';
import {
    IUserRegisterInput,
    IEmailVerify,
    IUserLogin,
    IUserResendcode,
    IUserForgotPassEmail,
    IUserResetPass,
    IUserForgotPassPhone,
    IEditProfile,
    IEditEmail,
    IChangeEmail,
} from '../dto';
import { GenCode, generateAndStoreOTP, sendMail } from '../utility/helpers';
import bcrypt from 'bcryptjs';
import twilio from 'twilio';
import config from '../config/environmentVariables';
import log from '../utility/logger';
import { createAccessToken, createRefreshToken } from '../utility/jwtUtility';

export const createUserService = async (payload: IUserRegisterInput['body']) => {
    try {
        const { firstName, lastName, email, password, userName, phone, confirmPassword } = payload;
        const userExist = await UserModel.findOne({ email });
        if (userExist)
            return {
                status: 409,
                message: 'User already exists',
            };
        if (password !== confirmPassword) {
            return {
                status: 400,
                message: 'Passwords Do Not Match',
            };
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await UserModel.create({
            email,
            firstName,
            lastName,
            password: hashPassword,
            userName,
            phoneNumber: phone,
        });

        const otp = await generateAndStoreOTP(user.email);

        user.password = undefined;
        const name = `${user.firstName} ${user.lastName}`;
        const message = `<h1>Email Verification</h1>
        <h2>Hello ${name}</h2>
        <p>Kindly verify your email address to complete the signup and login to your account</br> by inputing the code below.</p>
        <p>Verification Code: ${otp}</p>
        <p>This Code expires in 5mins</p>`;
        const subject = 'Please Verify Your Email';

        await sendMail(name, user?.email, subject, message);

        return { status: 200, message: 'Email Sent Successfully, Please Verify You Account Before You Login', data: user };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const resendCodeService = async (payload: IUserResendcode) => {
    try {
        const { email } = payload;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return {
                status: 404,
                message: 'user not found',
            };
        }
        const otp = await generateAndStoreOTP(payload.email);
        const name = `${user.firstName} ${user.lastName}`;
        const message = `<h1>Email Verification</h1>
        <h2>Hello ${name}</h2>
        <p>Kindly verify your email address to complete the signup and login to your account</br> by inputing the code below.</p>
        <p>Verification Code: ${otp}</p>
        <p>This Code expires in 5mins</p>`;
        const subject = 'Please Verify Your Email';

        await sendMail(name, user?.email, subject, message);
        if (sendMail != null) {
            return { status: 200, message: 'Verification Code Resent Successfully' };
        }
        return { status: 400, message: 'Error Sending Email' };
    } catch (error) {
        log.info(error);
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const verifyEmailService = async (payload: IEmailVerify) => {
    try {
        const { otp, email } = payload;
        const verifyEmail: any = await OtpModel.findOne({ userEmail: email });

        if (!verifyEmail) {
            return {
                status: 400,
                message: 'Otp has expired, please request for a new one',
            };
        }
        const rightOtp = bcrypt.compare(otp, verifyEmail.otp);
        if (!rightOtp) {
            return {
                status: 409,
                message: 'Invalid OTP',
            };
        }
        const user: any = await UserModel.findOne({ email: verifyEmail.userEmail });
        if (user.status === 'Active' && user.IsEmailVerified === true) {
            return {
                status: 401,
                message: 'This Email Is Already verified',
            };
        }
        user.status = 'Active';
        user.isEmailVerified = true;
        await user.save();

        user.password = undefined;
        return { status: 200, message: 'Verification successful!!!✅', data: user };
    } catch (error: any) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const UserLoginService = async (payload: IUserLogin) => {
    try {
        const { email, password } = payload;
        const user: any = await UserModel.findOne({ email });
        if (!user)
            return {
                status: 404,
                message: 'User Not Found',
            };
        const verifyPass = await bcrypt.compare(password, user?.password);
        if (!verifyPass)
            return {
                status: 401,
                message: 'Invalid Credentials',
            };
        if (user?.isEmailVerified !== true)
            return {
                status: 400,
                message: 'Your account is not active, Please activate your account',
            };

        const accessToken = await createAccessToken(user?.id, user?.email);

        const refreshToken = await createRefreshToken(user?.id, user?.email);

        await UserModel.updateOne({ _id: user.id }, { refreshToken });

        user.password = undefined;
        user.refreshToken = undefined;

        return {
            status: 200,
            message: 'Login Successful',
            data: {
                accessToken,
                refreshToken,
                user,
            },
        };
    } catch (error: any) {
        return { status: 500, message: 'Internal Server Error' };
    }
};

export const forgotPassEmailService = async (payload: IUserForgotPassEmail) => {
    try {
        const { email } = payload;
        const user: any = await UserModel.findOne({ email });

        if (!user) {
            return {
                status: 404,
                message: 'User Not Found',
            };
        }
        const otp = await generateAndStoreOTP(user.email);

        const name = `${user?.firstName} ${user?.lastName}`;
        const message = `<h1>Forgot Password</h1>
        <h2>Hello ${user?.firstName} ${user?.lastName}</h2>
        <p>A reset password action wan initiated using your email. If the action was your doing please input the code below.</p>
        <p>Verification Code: ${otp}</p>`;
        const subject = 'Please confirm your account';

        await sendMail(name, user?.email, subject, message);
        if (sendMail != null) {
            return { status: 200, message: 'Reset Password Code Sent Successfully' };
        }
        return { status: 400, message: 'Error Sending Email' };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const forgotPassPhoneService = async (payload: IUserForgotPassPhone) => {
    try {
        const { phoneNumber } = payload;
        const accountSid = config.TWILO_ACCOUNT_SID;
        const authToken = config.TWILO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);
        const user: any = await UserModel.findOne({ phoneNumber });
        if (!user || user === null) {
            return {
                status: 404,
                message: 'User Not Found',
            };
        }
        user.confirmationCode = await GenCode();
        await user.save();
        const message = await client.messages.create({
            body: `Hello ${user.firstName} ${user.lastName}, this is your reset password code ${user.confirmationCode}`,
            from: config.SMS_NUMBER,
            to: `${user.phoneNumber}`,
        });
        log.info(message.sid);
        return { status: 200, message: 'Reset Password Code Sent Successfully' };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const resetPassService = async (payload: IUserResetPass) => {
    try {
        const { email, code, password, confirmPassword } = payload;
        const verifyEmail: any = await OtpModel.findOne({ userEmail: email });

        if (!verifyEmail || verifyEmail === null) {
            return { status: 400, message: 'Code Has Expired Please Request For A New One' };
        }

        const rightOtp = await bcrypt.compare(code, verifyEmail.otp);

        if (!rightOtp) {
            return { status: 409, message: 'Invalid OTP' };
        }

        if (confirmPassword !== password) {
            return { status: 401, message: 'Passwords do not match' };
        }

        const user: any = await UserModel.findOne({ email: verifyEmail.userEmail });
        const newpassword = await bcrypt.hash(password, 12);
        user.password = newpassword;
        await user.save();
        user.password = undefined;
        return { status: 200, message: 'Password Reset Successfully', data: user };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const updateProfileService = async (user: string, payload: IEditProfile) => {
    try {
        const firstName = payload.fullName?.split(' ')[0];
        const lastName = payload.fullName?.split(' ')[1];

        const User = await UserModel.findById(user).exec();
        if (!User) {
            return { status: 401, message: 'User Does Exist' };
        }
        User.firstName = firstName || User.firstName;
        User.lastName = lastName || User.lastName;
        User.userName = payload.userName || User.userName;
        User.gender = payload.gender || User.gender;
        User.bio = payload.bio || User.bio;
        User.email = payload.email || User.email;
        User.phoneNumber = payload.phoneNumber || User.phoneNumber;

        const findUserName = await UserModel.findOne({ userName: payload.userName });
        if (findUserName) {
            return { status: 400, message: 'This User Has Already Been Taken' };
        }

        await User.save();
        User.password = undefined;
        return { status: 200, message: 'User Profile Updated Successfully', data: user };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const editEmailService = async (user: string, payload: IEditEmail) => {
    try {
        if (!user) return { status: 404, message: 'User Not Found' };

        const User: any = await UserModel.findById(user).exec();
        if (payload.email !== User.email) {
            return { status: 401, message: 'This Email Address Does Not Exist On Your Account' };
        }

        const otp = await generateAndStoreOTP(payload.email);
        const name = `${User.firstName} ${User.lastName}`;
        const message = `<h1>Change Of Email</h1>
        <h2>Hello ${name}</h2>
        <p>A request has been made to change your email.</br>
        If you did initiate this action please login to your account and change your password.</br>
        Else input the code below to continue</p>
        <p>Verification Code: ${otp}</p>
        <p>This Code expires in 5mins</p>`;
        const subject = 'Email Change Code';

        await sendMail(name, User.email, subject, message);
        if (sendMail != null) {
            return { status: 200, message: 'Email Change Code Sent Successfully' };
        }
        return { status: 400, message: 'Error Sending Email' };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const changeEmailService = async (user: string, payload: IChangeEmail) => {
    try {
        const { otp, email } = payload;
        if (!user) {
            return { status: 404, message: 'User Not Found' };
        }
        const User: any = await UserModel.findById(user).exec();
        const Otp: any = await OtpModel.findOne({ userEmail: User.email });
        log.info('User Otp', Otp);
        if (!Otp || Otp === null) {
            return {
                status: 400,
                message: 'Code Has Expired Please Request For A New One',
            };
        }
        const rightOtp = await bcrypt.compare(otp, Otp.otp);
        log.info('Right OTP: ', rightOtp);
        if (!rightOtp) {
            return {
                status: 401,
                message: 'Invalid OTP',
            };
        }
        User.email = email;
        User.save();
        User.password = undefined;
        return { status: 200, message: 'Email Changed Successfully', data: User };
    } catch (error) {
        log.info(error);
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const getProfileService = async (user: string) => {
    try {
        if (!user) return { status: 404, message: 'User not found' };
        const User: any = await UserModel.findById(user);
        User.password = undefined;
        return { status: 200, message: 'User found', data: User };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const getUserByIdService = async (userId: string) => {
    try {
        const User: any = await UserModel.findById(userId);
        if (!User) {
            return { status: 404, message: 'User not found' };
        }
        User.password = undefined;
        return { status: 200, message: 'User found', data: User };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const followService = async (user: string, followId: string) => {
    try {
        if (!user) {
            return { status: 404, message: 'User Not Found' };
        }
        const followProfile = await UserModel.findById(followId).exec();
        if (!followProfile) {
            return { status: 401, message: "Can't Follow This User, They Do Not Exist" };
        }
        const User: any = await UserModel.findById(user).exec();
        if (User.following.includes(followId)) {
            return { status: 400, message: 'Already Following This User. Cannot Follow User Twice' };
        }

        followProfile.followers.push(user);
        User.following.push(followId);
        followProfile.save();
        User.save();
        User.password = undefined;
        return { status: 200, message: 'Followed User Successfuly', data: User };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};

export const unfollowService = async (user: string, unfollowId: string) => {
    try {
        if (!user) {
            return { status: 404, message: 'User Not Found' };
        }
        const unfollowProfile: any = await UserModel.findById(unfollowId).exec();
        if (!unfollowProfile) {
            return { status: 401, message: "Can't Unfollow This User, They Do Not Exist" };
        }
        const User: any = await UserModel.findById(user).exec();
        if (User.following.includes(unfollowId)) {
            User.following.pull(unfollowId);
            unfollowProfile.followers.pull(user);
            unfollowProfile.save();
            User.save();
            User.password = undefined;
            return { status: 200, message: 'User Unfollowed Successfully', data: User };
        }
        return { status: 400, message: "Can't Unfollow A User You Are Not Following" };
    } catch (error) {
        return { status: 500, message: 'Internal Server Error', data: error };
    }
};
