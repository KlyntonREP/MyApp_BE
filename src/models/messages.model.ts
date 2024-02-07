import mongoose, { Schema } from 'mongoose';
import ChatModel from './chat.model';


interface MessageDoc extends Document {
    text: string;
    chatId: typeof ChatModel[];
    senderId: string;
    receiverId: string;
    isMedia: boolean;
    media: string;
    mediaType: string;
    status: string;
    messageType: string;
    messageUniqueId: string;
    createdAt: Date;
}


const messageSchema = new Schema<MessageDoc>({
  text: String,
  chatId: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat',
  }],
  senderId: {
    type: String,
    index: true,
  },
  receiverId: {
    type: String,
    index: true,
  },
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
    default: "sent",
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
  }
},{timestamps: true});

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
