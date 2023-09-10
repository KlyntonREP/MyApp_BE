import { UserModel } from "../models/index"
import { IUserRegisterInput, 
    IUserVerify, 
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
                message:"Error",
                data: 'Passwords do not match' 
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
            confirmationCode: await GenCode(),
        });

        const name = `${user.firstName} ${user.lastName}`;
        const message = `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Kindly verify your email address to complete the signup and login to your account</br> by inputing the code below.</p>
        <p>Verification Code: ${user?.confirmationCode}</p>`;
        const subject = "Please confirm your account";

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
        const user = await UserModel.findOne({email: email})
        if(!user){
            return{
                status:404,
                message:"user not found",
            };
        }
        user.confirmationCode = await GenCode()
        const newUser  = await user.save();
        const name = `${user.firstName} ${user.lastName}`;
        const message = `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Kindly verify your email address to complete the signup and login to your account</br> by inputing the code below.</p>
        <p>Verification Code: ${newUser.confirmationCode}</p>`;
        const subject = "Please confirm your account";

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

export const verifyUserService = async (req: IUserVerify) => {
    try{
        const { verification_code } = req
        const verifyUser: any = await UserModel.findOne({ confirmationCode: verification_code});
        if(!verifyUser || verifyUser === null){
            return{
                status:400,
                message:"Invalid Code", 
            };
        }
        if(verifyUser.status === "Active"){
            return{
                status: 401,
                message: "This Account Is Already verified"
            }
        }
        verifyUser.status = "Active";
        verifyUser.confirmationCode = "";
        const newVerify = await verifyUser.save();
        
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
        console.log("verifyPass ======", verifyPass);
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
        const userByEmail: any = await UserModel.findOne({ email: email });
        
        if(!userByEmail){
            return{
                status:404,
                message:"User Not Found", 
            };
        }
        userByEmail.confirmationCode = await GenCode()
        await userByEmail.save();
        

        const name = `${userByEmail?.firstName} ${userByEmail?.lastName}`;
        const message = `<h1>Forgot Password</h1>
        <h2>Hello ${userByEmail?.firstName} ${userByEmail?.lastName }</h2>
        <p>A reset password action wan initiated using your email. If the action was your doing please input the code below.</p>
        <p>Verification Code: ${userByEmail?.confirmationCode }</p>`;
        const subject = "Please confirm your account";

        await sendMail(name, userByEmail?.email, subject, message);
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
        const { code, password, confirmPassword} = req;
        const user: any = await UserModel.findOne({ confirmationCode: code});
        if(!user){
            return{
                status:400,
                message:"Invalid Code, Please Input The Correct Code.", 
            };
        }
        if (confirmPassword !== password) {
            return {
                status: 401,
                message: "Passwords do not match"
            }
        }
        
        const newpassword = await bcrypt.hash(password, 12);
        user.password = newpassword;
        user.confirmationCode = "";
        const newUser = await user.save();

        return {status: 200, message: "Password Reset Successfully", data: newUser}

    }catch(error){
        console.log(error);
        return{status: 500, message: "Internal Server Error"}   
    }
}





















