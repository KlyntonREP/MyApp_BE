import { Request, Response } from 'express';
import { ICreatePost } from '../dto';
import {
    createPostService,
    homepageService
} from "../services/index";

/**
 * @description Create A Post
 * @method POST
 * @route /api/user/create-post/:userId
 * @access private
 */
export const createpostController = async(req: Request, res:Response) => {
    try{
        const payload = <ICreatePost>req.body
        const user: string = await req.user.id;
        const file = req.files as { [fieldname: string]: Express.Multer.File[] };
        const response: any = await createPostService(payload, user, file);
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
 * @description Get Posts On The Home Page
 * @method GET
 * @route /api/user/get-posts
 * @access private
 */
export const getHomePageController = async(req: Request, res:Response) => {
    try{
        const user: string = await req.user.id;
        const response: any = await homepageService( user );
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