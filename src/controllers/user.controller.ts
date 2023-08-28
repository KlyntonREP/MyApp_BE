import { Request, Response } from 'express';
import { createUserService } from "../services/index";


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