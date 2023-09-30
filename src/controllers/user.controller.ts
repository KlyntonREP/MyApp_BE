import { Request, Response } from 'express';
import {  createUserService, 
    verifyEmailService , 
    UserLoginService, 
    resendCodeService, 
    forgotPassEmailService,
    forgotPassPhoneService,
    resetPassService,
    followService,
    unfollowService,
    updateProfileService,
    getProfileService,
    getUserByIdService,
    editEmailService,
    changeEmailService
} from "../services/index";
import { IChangeEmail } from '../dto';


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
        const response: any = await verifyEmailService(req.body);
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

/**
 * @description Update Profile
 * @method PUT
 * @route /api/user/update-profile
 * @access public
 */
export const updateProfilerController = async(req: Request, res: Response) => {
    try{
        const user: string = await req.user.id;
        const response: any = await updateProfileService(user, req.body);
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
 * @description Edit Email Address
 * @method POST
 * @route /api/user/edit-email
 * @access public
 */
export const editEmailController = async(req: Request, res: Response) => {
    try{
        const user: string = await req.user.id;
        const response: any = await editEmailService(user, req.body);
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
 * @description Change Email Address
 * @method PUT
 * @route /api/user/change-email
 * @access public
 */
export const changeEmailController = async(req: Request, res: Response) => {
    try{
        const user: string = await req.user.id;
        const payload = <IChangeEmail>req.body
        const response: any = await changeEmailService(user, payload);
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
 * @description Get Profile
 * @method GET
 * @route /api/user/profile
 * @access public
 */
export const getProfileController = async(req: Request, res: Response) => {
    try{
        const user: string = await req.user.id
        const response: any = await getProfileService(user);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        res.status(500).json({message: error.message});
    }
}

/**
 * @description Get User By Id
 * @method GET
 * @route /api/user/profile/:userId
 * @access public
 */
export const getUserByIdController = async(req: Request, res: Response) => {
    try{
        const { userId: userId } = req.params;
        const response: any = await getUserByIdService(userId);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        res.status(500).json({message: error.message});
    }
}

/**
 * @description Follow A User
 * @method POST
 * @route /api/user/follow/:followId
 * @access public
 */
export const followController =  async(req: Request, res: Response) => {
    try{
        const user: string = await req.user.id
        const { followId: followId } = req.params;
        const response: any = await followService(user, followId);
        return res.status(response.status).json({
            status: response.status, 
            message: response.message, 
            data: response.data
        });
    }catch(error: any){
        res.status(500).json({message: error.message});
    }
    
}

/**
 * @description Unfollow A User
 * @method POST
 * @route /api/user/unfollow/:unfollowId
 * @access public
 */

export const unfollowController =  async(req: Request, res: Response) => {
    try{
        const user: string = await req.user.id
        const { unfollowId: unfollowId } = req.params;
        const response: any = await unfollowService(user, unfollowId);
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