import mongoose, { Schema } from 'mongoose';
import UserModel from './user.model';
import MessageModel from './messages.model';

interface ChatDoc extends Document {
    users: (typeof UserModel)[];
    messages: (typeof MessageModel)[];
    isGroup: boolean;
    groupName?: string;
}

const ChatSchema: Schema | undefined = new mongoose.Schema<ChatDoc>(
    {
        users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
        isGroup: {
            type: Boolean,
            default: false,
        },
        groupName: {
            type: String,
        },
    },
    { timestamps: true },
);

ChatSchema.pre('save', function (next) {
    if (this.isGroup) {
        if (this.users.length > +(process.env.MAX_GROUP_NUMBER as string)) {
            next(new Error(`Maximum Number Of Users In A Group Must Not Exceed ${process.env.MAX_GROUP_NUMBER}`));
        }
    } else {
        if (this.users.length > 2) {
            next(new Error('Maximum Number Of Users In A Users Room Must Not Be More Than 2'));
        }
    }
    next();
});

const ChatModel = mongoose.model<ChatDoc>('Chat', ChatSchema);

export default ChatModel;
