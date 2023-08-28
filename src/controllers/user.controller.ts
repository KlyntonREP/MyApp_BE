import { Request, Response } from 'express';
import { createUserService, verifyUserService } from "../services/index";


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