import { UserModel } from "../models/index"
import { IUserRegisterInput, 
    IUserVerify, 
    IUserLogin, 
    IUserResendcode, 
    IUserForgotPass,
    IUserResetPass
} from "../dto"
import log from '../utility/logger';
import { GenCode, sendMail} from "../utility/helpers";
import bcrypt from 'bcryptjs';
import { signToken } from '../utility/jwtUtility';

export const createUserService = async(req: IUserRegisterInput["body"]) => {
    try{
        const { firstName, lastName, email, password, userName, phone, confirmPassword } = req;
        const userExist = await UserModel.findOne({ email: email });
        if(userExist) return{
            status:409,
            message:"Error",
            data: 'User already exists' 
        };
        if(password != confirmPassword){
            return{
                status:400,
                message:"Error",
                data: 'Passwords do not match' 
            };
        }
        const user = await UserModel.create({ 
            email: email, 
            firstName: firstName, 
            lastName: lastName, 
            password: password, 
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
        
        return {status: 200, message: "Email Sent Successfully", data: user}

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
        const name = `${user.firstName} ${user.lastName}`;
        const message = `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Kindly verify your email address to complete the signup and login to your account</br> by inputing the code below.</p>
        <p>Verification Code: ${user?.confirmationCode}</p>`;
        const subject = "Please confirm your account";

        await sendMail(name, user?.email, subject, message);
        if(sendMail != null){
            return {status: 200, message: "Email Sent Successfully"}
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
        if(!verifyUser){
            return{
                status:400,
                message:"Invalid Code", 
            };
        }
        verifyUser.status = "Active";
        verifyUser.confirmationCode = '';
        await verifyUser.save();
        return {status: 200, message: "Verification successful!!!✅"}

    }catch(error) {
        log.error(error);
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
        const verifyPass = await bcrypt.compare(password, userEmail?.password || userByUsername?.password);
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

export const forgotPassService = async(res: IUserForgotPass) => {
    try{
        const { email, phone } = res;
        const userByEmail: any = await UserModel.findOne({ email: email });
        const userByPhone: any = await UserModel.findOne({ phoneNumber: phone });
        
        if(!userByEmail &&!userByPhone){
            return{
                status:404,
                message:"User Not Found", 
            };
        }
        if(userByEmail == null){
            userByPhone.confirmationCode = await GenCode();
            await userByPhone.save();
        }
        userByEmail.confirmationCode = await GenCode()
        await userByEmail.save();
        

        const name = `${userByEmail?.firstName || userByPhone?.firstName} ${userByEmail?.lastName || userByPhone?.lastName}`;
        const message = `<h1>Forgot Password</h1>
        <h2>Hello ${userByEmail?.firstName || userByPhone?.firstName} ${userByEmail?.lastName || userByPhone?.lastName}</h2>
        <p>A reset password action wan initiated using your email. If the action was your doing please input the code below.</p>
        <p>Verification Code: ${userByEmail?.confirmationCode || userByPhone?.confirmationCode}</p>`;
        const subject = "Please confirm your account";

        await sendMail(name, userByEmail?.email|| userByPhone?.email, subject, message);
        if(sendMail != null){
            return {status: 200, message: "Email Sent Successfully"}
        }
        return {status: 400, message:"Error Sending Email"}

    }catch(error){
        console.log(error);
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

        const newpassword = await bcrypt.hash(password, 10);
        user.password = newpassword;
        await user.save();

        return {status: 200, message: "Password Reset Successfully"}

    }catch(error){
        console.log(error);
        return{status: 500, message: "Internal Server Error"}   
    }
}