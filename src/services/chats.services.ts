import { ICreateGroup, ISendMessage } from "../dto/chat.dto";
import { ChatModel, UserModel, MessageModel } from "../models";

export const createChatService = async(payload: ISendMessage, userId: string, counterPartyId: string) => {
    try{
        const receiver  = await UserModel.findById(counterPartyId)
        if(!receiver) return{status:404, message: "User Not Found"};

        // check if chat exists
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

        // check if chat exists
        const chatExists = await ChatModel.findOne({ users: {$all: [userId, counterPartyId]}})
        return {status: 200, message: "Chat Fetched Successfully", data: chatExists}
    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}

export const sendMessageService = async(payload: ISendMessage) => {
    try{
        const chatExist  = await ChatModel.findById({ id: payload.chatId })
        if(chatExist){
            if(payload.isGroup === true){
                const newMessage =  await MessageModel.create({ ...payload, messageType: 'user:users' });
                chatExist.messages.push(newMessage.id);
                await chatExist.save();
                return{status: 200, message: "Group Message Sent Successfully", data: newMessage}
            }
            const chatExists = await ChatModel.findOne({ id: payload.chatId, users: {$all:
                [payload.receiverId[0], payload.senderId]}})
            if(chatExists){
                const newMessage =  await MessageModel.create({ ...payload, messageType: 'user:user' });
                chatExists.messages.push(newMessage.id);
                await chatExists.save();
                return{status: 201, message: "Message Sent Successfully", data: newMessage}
            }
        }
        return{status:404, message: "Chat Does Not Exist"};
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

export const createGroupService = async(payload: ICreateGroup ) => {
    try{
        if(payload.isGroup === true){
            if(payload.users.length > 10) return {status: 401, message: "Group Members Cannot Be More Than 10"}
                const newgroup = await ChatModel.create({ ...payload })
                return {status: 200, message: "Group Created Successfully", data: newgroup}
        }
        return {status: 404, message: "Cannot Create Group, Please Try Again"}
    }catch(error){
        return{status: 500, message: "Internal Server Error", data: error}
    }
}