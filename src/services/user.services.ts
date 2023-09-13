import { UserModel, OtpModel } from "../models/index"
import { IUserRegisterInput, 
    IEmailVerify, 
    IUserLogin, 
    IUserResendcode, 
    IUserForgotPassEmail,
    IUserResetPass,
    IUserForgotPassPhone,
} from "../dto"
import log from '../utility/logger';
import { GenCode, sendMail} from "../utility/helpers";
import bcrypt from 'bcryptjs';
import { signToken } from '../utility/jwtUtility';
import twilio from 'twilio';
import config from "../config/environmentVariables";



export const createUserService = async(req: IUserRegisterInput["body"]) => {
    try{
        const { firstName, lastName, email, password, userName, phone, confirmPassword } = req;
        const userExist = await UserModel.findOne({ email: email });
        if(userExist) return{
            status:409,
            message:"User already exists",
        };
        if(password != confirmPassword){
            return{
                status:400,
                message:"Passwords Do Not Match",
            };
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await UserModel.create({ 
            email: email, 
            firstName: firstName, 
            lastName: lastName, 
            password: hashPassword, 
            userName: userName, 
            phoneNumber: phone,
        });

        const genOtp = await GenCode()
        const hashOtp = await bcrypt.hash(genOtp,12)
        const OtModel = await OtpModel.create({
            otp: hashOtp,
            userEmail: user.email  
        })

        user.password = undefined
        const name = `${user.firstName} ${user.lastName}`;
        const message = `<h1>Email Verification</h1>
        <h2>Hello ${name}</h2>
        <p>Kindly verify your email address to complete the signup and login to your account</br> by inputing the code below.</p>
        <p>Verification Code: ${genOtp}</p>
        <p>This Code expires in 5mins</p>`;
        const subject = "Please Verify Your Email";

        await sendMail(name, user?.email, subject, message);
        
        const response =  {status: 200, message: "Email Sent Successfully", data: user}

        return response

    }catch(error) {
        log.error(error);
        return{status: 500, message:"Internal Server Error"}
    }
}

export const resendCodeService = async (req: IUserResendcode) => {
    try{
        const { email } = req;
        const user = await UserModel.findOne({ email: email })
        if(!user){
            return{
                status:404,
                message:"user not found",
            };
        }
        const findOtp: any = await OtpModel.findOne({ userEmail: user.email });
        const genOtp = await GenCode()
        const hashOtp = await bcrypt.hash(genOtp, 12);
        if(findOtp){     
            findOtp.otp = hashOtp
            await findOtp.save();
        }else{
            const OtModel = await OtpModel.create({
                otp: hashOtp,
                userEmail: user.email  
            })
        }
        const name = `${user.firstName} ${user.lastName}`;
        const message = `<h1>Email Verification</h1>
        <h2>Hello ${name}</h2>
        <p>Kindly verify your email address to complete the signup and login to your account</br> by inputing the code below.</p>
        <p>Verification Code: ${genOtp}</p>
        <p>This Code expires in 5mins</p>`;
        const subject = "Please Verify Your Email";

        await sendMail(name, user?.email, subject, message);
        if(sendMail != null){
            return {status: 200, message: "Verification Code Resent Successfully"}
        }
        return {status: 400, message:"Error Sending Email"}
    }catch(error){
        console.log(error);
        return{status: 500, message:"Error Resending Code 😔"}
    }
}

export const verifyEmailService = async (req: IEmailVerify) => {
    try{
        const { otp, email } = req
        const verifyEmail: any = await OtpModel.findOne({ userEmail: email });
        console.log(verifyEmail)
        
        if(!verifyEmail || verifyEmail === null){
            return{
                status:400,
                message:"Code Has Expired Please Request For A New One", 
            };
        }
        const rightOtp = await bcrypt.compare(otp, verifyEmail.otp)
        if(!rightOtp){
            return{
                status:409,
                message:"Invalid OTP", 
            }; 
        }
        const user: any = await UserModel.findOne({ email: verifyEmail.userEmail})
        if(user.status === "Active" && user.IsEmailVerified == true ){
            return{
                status: 401,
                message: "This Email Is Already verified"
            }
        }
        user.status = "Active";
        user.isEmailVerified = true;
        const newVerify = await user.save();
        
        return {status: 200, message: "Verification successful!!!✅", data: newVerify}

    }catch(error) {
        console.log(error);
        return{status: 500, message:"Internal Server Error"}
    };
}

export const UserLoginService = async ( req: IUserLogin ) => {
    try{
        const { username, email, password } = req
        const userEmail: any = await UserModel.findOne({ email: email });
        const userByUsername: any = await UserModel.findOne({ userName: username });
        if(!userEmail && !userByUsername){
            return{
                status:404,
                message:"User Not Found", 
            };
        }
        const verifyPass = await bcrypt.compare(password, userEmail?.password || userByUsername?.password );
        if(!verifyPass){
            return{
                status:401,
                message:"Invalid Credentials", 
            };
        }
        if(userEmail?.status != "Active" && userByUsername?.status != "Active"){
            return{
                status:400,
                message:"Your account is not active, Please activate your account", 
            };
        }
        return{status: 200, message:"Login Successful", data:{
            _id: userEmail?.id || userByUsername?.id,
            username: userEmail?.userName || userByUsername?.userName,
            token: await signToken({ user: userEmail?.id || userByUsername?.id, username: userEmail?.userName || userByUsername?.userName})
        }}
    }catch(error) {
        console.log(error);
        return{status: 500, message:"Internal Server Error"}
    };
};

export const forgotPassEmailService = async(res: IUserForgotPassEmail) => {
    try{
        const { email } = res;
        const user: any = await UserModel.findOne({ email: email });
        
        if(!user){
            return{
                status:404,
                message:"User Not Found", 
            };
        }
        const findOtp: any = await OtpModel.findOne({ userEmail: user.email });
        const genOtp = await GenCode()
        const hashOtp = await bcrypt.hash(genOtp, 12);
        if(findOtp){     
            findOtp.otp = hashOtp
            await findOtp.save();
        }else{
            const OtModel = await OtpModel.create({
                otp: hashOtp,
                userEmail: user.email  
            })
        }
        

        const name = `${user?.firstName} ${user?.lastName}`;
        const message = `<h1>Forgot Password</h1>
        <h2>Hello ${user?.firstName} ${user?.lastName }</h2>
        <p>A reset password action wan initiated using your email. If the action was your doing please input the code below.</p>
        <p>Verification Code: ${genOtp }</p>`;
        const subject = "Please confirm your account";

        await sendMail(name, user?.email, subject, message);
        if(sendMail != null){
            return {status: 200, message: "Reset Password Code Sent Successfully"}
        }
        return {status: 400, message:"Error Sending Email"}

    }catch(error){
        console.log(error);
        return{status: 500, message: "Internal Server Error"}
    }
}

export const forgotPassPhoneService = async(req: IUserForgotPassPhone) => {
    try{
        const { phoneNumber } = req;
        const accountSid = config.TWILO_ACCOUNT_SID;
        const authToken = config.TWILO_AUTH_TOKEN;
        const client = twilio(accountSid, authToken);
        const user: any = await UserModel.findOne({ phoneNumber: phoneNumber})
        if(!user || user === null){
            return{
                status:404,
                message:"User Not Found"
            }
        }
        user.confirmationCode = await GenCode()
        await user.save();
        const message = await client.messages.create({
            body: `Hello ${user.firstName} ${user.lastName}, this is your reset password code ${user.confirmationCode}`,
            from: config.SMS_NUMBER,
            to: `${user.phoneNumber}`
        })
        console.log(message.sid)
        return {status: 200, message: "Reset Password Code Sent Successfully"}
    }catch(error){
        console.log(error)
        return{status: 500, message: "Internal Server Error"}
    }
}

export const resetPassService = async(req: IUserResetPass) => {
    try{
        const { email, code, password, confirmPassword} = req;
        const verifyEmail: any = await OtpModel.findOne({ userEmail: email });
        
        if(!verifyEmail || verifyEmail === null){
            return{
                status:400,
                message:"Code Has Expired Please Request For A New One", 
            };
        }
        const rightOtp = await bcrypt.compare(code, verifyEmail.otp)
        if(!rightOtp){
            return{
                status:409,
                message:"Invalid OTP", 
            }; 
        }
        if (confirmPassword !== password) {
            return {
                status: 401,
                message: "Passwords do not match"
            }
        }
        const user: any = await UserModel.findOne({ email: verifyEmail.userEmail})
        const newpassword = await bcrypt.hash(password, 12);
        user.password = newpassword;
        const newUser = await user.save();

        return {status: 200, message: "Password Reset Successfully", data: newUser}

    }catch(error){
        console.log(error);
        return{status: 500, message: "Internal Server Error"}   
    }
}





















