import mongoose, { Schema } from 'mongoose';
import ChatModel from './chat.model';
import UserModel from './user.model';

interface MessageDoc extends Document {
    text: string;
    chatId: (typeof ChatModel)[];
    senderId: string;
    receiverId: (typeof UserModel)[];
    isMedia: boolean;
    media: string;
    mediaType: string;
    status: string;
    messageType: string;
    messageUniqueId: string;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema<MessageDoc>(
    {
        text: String,
        chatId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Chat',
            },
        ],
        senderId: {
            type: String,
            index: true,
        },
        receiverId: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        isMedia: {
            type: Boolean,
            default: false,
        },
        media: String,
        mediaType: {
            type: String,
            enum: ['image', 'pdf', 'audio'],
        },
        status: {
            type: String,
            enum: ['sent', 'received', 'read'],
            default: 'sent',
            index: true,
        },
        messageType: {
            type: String,
            enum: ['user:user', 'user:users'],
            index: true,
            required: true,
        },
        messageUniqueId: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true },
);

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;
