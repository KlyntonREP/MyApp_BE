import { Request, Response } from 'express';
import { createChatService, createGroupService, getMessagesService, getUserChatsService, getUsersChatService, sendMessageService } from '../services';
import { ICreateGroup } from '../dto/chat.dto';

/**
 * @description Create Chat Message
 * @method POST
 * @route /api/chat/create-chat/:counterPartyId
 * @access private
 */
export const createChatController = async(req: Request, res: Response) => {
    try{
        const userId: string = await req.loggedInUser.id;
        const payload: any = req.body
        const { counterPartyId: counterPartyId } = req.params;
        const response: any = await createChatService(payload, userId, counterPartyId)
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
 * @description Get User Chats
 * @method GET
 * @route /api/chat/user-chats
 * @access private
 */
export const getUserChatsController = async(req: Request, res: Response) => {
    try{
        const userId: string = await req.loggedInUser.id;
        const response: any = await getUserChatsService(userId)
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
 * @description Get Users Chat
 * @method GET
 * @route /api/chat/users-chat
 * @access private
 */
export const getUsersChatController = async(req: Request, res: Response) => {
    try{
        const userId: string = await req.loggedInUser.id;
        const { counterPartyId: counterPartyId } = req.params;
        const response: any = await getUsersChatService(counterPartyId,userId)
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
 * @description Send Message
 * @method POST
 * @route /api/chat/send-message
 * @access private
 */
export const sendMessageController = async(req: Request, res: Response) => {
    try{
        const payload = req.body;
        const response: any = await sendMessageService(payload)
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
 * @description Send Message
 * @method POST
 * @route /api/chat/send-message
 * @access private
 */

export const getMessagesController = async(req: Request, res: Response) => {
    try{
        const {chatId: chatId} = req.params;
        const response: any = await getMessagesService(chatId)
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
 * @description Create Group
 * @method POST
 * @route /api/chat/create-group
 * @access private
 */
export const createGroupController = async (req: Request, res: Response) => {
    try{
        const payload: ICreateGroup = req.body;
        const response = await createGroupService(payload);
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