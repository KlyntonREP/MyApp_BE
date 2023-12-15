import mongoose, { Schema } from 'mongoose';
import RoomModel from './room.model';


interface MessageDoc extends Document {
    text: string;
    room: typeof RoomModel[];
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
  room: [{
    type: Schema.Types.ObjectId,
    ref: 'Room',
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
    enum: ['sent', 'read'],
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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
