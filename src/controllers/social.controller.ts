import { Request, Response, NextFunction } from 'express';
import {  
    googleAuthService,
} from "../services/index";


/**
 * @description Get Google Credentials
 * @method GET
 * @route /api/google
 * @access public
 */
export const googleAuthController = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const response: any = await googleAuthService(req, res, next);
        // return res.status(response.status).json({
        //     status: response.status, 
        //     message: response.message, 
        //     data: response.data
        // });
    }catch(error: any){
        res.status(500).json({message: error.message});
    }
}