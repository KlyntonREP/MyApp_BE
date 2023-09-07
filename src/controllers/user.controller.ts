import { Request, Response } from 'express';
import {  createUserService, 
    verifyUserService , 
    UserLoginService, 
    resendCodeService, 
    forgotPassEmailService,
    forgotPassPhoneService,
    resetPassService
} from "../services/index";


/**
 * @description user registration
 * @method POST
 * @route /api/user/register
 * @access public
 */
export const createUserController = async(req: Request, res: Response) => {
    try{
        const response: any = await createUserService(req.body);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

/**
 * @description resend verification code
 * @method POST
 * @route /api/user/resend-code
 * @access public
 */
export const resendCodeController  = async (req: Request, res: Response) => {
    try{
        const response: any = await resendCodeService(req.body);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message}); 
    }
}

/**
 * @description user Verification
 * @method POST
 * @route /api/user/verify
 * @access public
 */
export const verifyUserController = async(req: Request, res: Response) => {
    try{
        const response: any = await verifyUserService(req.body);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

/**
 * @description user Login
 * @method POST
 * @route /api/user/login
 * @access public
 */
export const UserLoginController = async(req: Request, res: Response) => {
    try{
        const response: any = await UserLoginService(req.body);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

/**
 * @description Forgot Password By email
 * @method POST
 * @route /api/user/forgot-password-email
 * @access public
 */
export const forgotPassEmailController =  async(req: Request, res: Response) => {
    try{
        const response: any = await forgotPassEmailService(req.body);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

/**
 * @description Forgot Password By phone
 * @method POST
 * @route /api/user/forgot-password-phone
 * @access public
 */
export const forgotPassPhoneController =  async(req: Request, res: Response) => {
    try{
        const response: any = await forgotPassPhoneService(req.body);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

/**
 * @description Reset Password
 * @method POST
 * @route /api/user/reset-password
 * @access public
 */
export const resetPassController =  async(req: Request, res: Response) => {
    try{
        const response: any = await resetPassService(req.body);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}