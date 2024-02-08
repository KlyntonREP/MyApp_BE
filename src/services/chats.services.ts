import { ICreateChat, ISendMessage } from "../dto/chat.dto";
import { ChatModel, UserModel, MessageModel } from "../models";

export const createChatService = async(payload: ISendMessage, userId: string, counterPartyId: string) => {
    try{
        const receiver  = await UserModel.findById(counterPartyId)
        if(!receiver) return{status:404, message: "User Not Found"};

        //check if chat exists
        const chatExists = await ChatModel.findOne({ users: {$all: [userId, counterPartyId]}})
        if(chatExists){

            const newMessage =  await MessageModel.create({ ...payload, messageType: 'user:user' });
            chatExists.messages.push(newMessage.id);
            await chatExists.save();
            return{status:200, message: "Chat Exists, Please Continue Chatting", data: newMessage};
        }

        
        const newChat = await ChatModel.create({
            users: [userId, counterPartyId]
        })
        const newMessage =  await MessageModel.create({ ...payload, chatId: newChat.id, messageType: 'user:user' });
        newChat.messages.push(newMessage.id)

        await newChat.save();
        return {status: 201, message: "Chat created Successfully", data: [ newChat, newMessage ]}
    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}

export const getUserChatsService = async(userId: string) => {
    try{
        const chats = await ChatModel.find({ users: {$in: userId}})
        return {status: 200, message: "Chats Found", data: chats}
    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}

export const getUsersChatService = async(userId: string, counterPartyId: string) => {
    try{
        const receiver  = await UserModel.findById(counterPartyId)
        if(!receiver) return{status:404, message: "User Not Found"};

        //check if chat exists
        const chatExists = await ChatModel.findOne({ users: {$all: [userId, counterPartyId]}})
        return {status: 200, message: "Chat Fetched Successfully", data: chatExists}
    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}

export const sendMessageService = async(payload: ISendMessage) => {
    try{
        const receiver = await UserModel.findById(payload.receiverId);
        if(!receiver) return{status:404, message: "User Not Found"};

        //TO DO: include chatId in the payload
       const newMessage =  await MessageModel.create({ ...payload, messageType: 'user:user' });

       const chatExists = await ChatModel.findOne({ users: {$all: [payload.receiverId, payload.senderId]}})

        if(!chatExists) return{status:401, message: "This User Chat Does Not Exist"};

        chatExists.messages.push(newMessage.id)
        await chatExists.save();

        return{status: 200, message: "Message Sent Successfully", data: newMessage}

    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}

export const getMessagesService = async(chatId: string)  => {
    try{
        const messages = await MessageModel.find({chatId})
        if(!messages) return{status:404, message: "No Messages Found"};

        return{status: 200, message: "Messages Fetched Successfully", data: messages}
    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}

export const createGroupService = async(payload: any ) => {
    try{
        
    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}