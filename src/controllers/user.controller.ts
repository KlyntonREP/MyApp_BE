import { Request, Response } from 'express';
import {  createUserService, 
    verifyUserService , 
    UserLoginService, 
    resendCodeService, 
    forgotPassService,
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
        return res.status(response.status).json(response.data);
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
        return res.status(response.status).json(response.data || response.message) ;
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
        return res.status(response.status).json(response.message);
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
        return res.status(response.status).json(response.data || response.message);
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

/**
 * @description Forgot Password
 * @method POST
 * @route /api/user/forgot-password
 * @access public
 */
export const forgotPassController =  async(req: Request, res: Response) => {
    try{
        const response: any = await forgotPassService(req.body);
        return res.status(response.status).json(response.message);
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
        return res.status(response.status).json(response.message);
    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}