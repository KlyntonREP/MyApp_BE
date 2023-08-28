import { UserModel } from "../models/index"
import { IUserRegisterInput, IUserVerify, IUserLogin } from "../dto"
import log from '../utility/logger';
import { GenCode, sendMail} from "../utility/helpers";

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
        
        return {status: 200, message: "Success", data: user}

    }catch(error) {
        console.log(error);
        log.error(error);
    }
}

export const verifyUserService = async (req: IUserVerify) => {
    try{
        const { verification_code } = req
        const verifyUser = await UserModel.findOne({ confirmationCode: verification_code});
        console.log(verification_code)
        if(!verifyUser){
            return{
                status:400,
                message:"Invalid Code", 
            };
        }
        verifyUser.status = "Active";
        verifyUser.confirmationCode = '';
        await verifyUser.save();
        return {status: 200, message: "Verification successful!!!"}

    }catch(error) {
        console.log(error);
        log.error(error);
    };
}

export const UserLoginService = async ( req: IUserLogin ) => {
    try{

    }catch(error) {
        console.log(error);
    };
};