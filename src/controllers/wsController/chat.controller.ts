import io from 'socket.io';
import RoomModel from "../../models/room.model";
import { ConnectionTypeEnum, StatusEnum, MessageStatusEnum } from "../../common/enums";
import UserModel from "../../models/user.model";
import MessageModel from "../../models/messages.model";

interface SendUserUserMessagePayload {
  text: string;
  isMedia: boolean;
  media: string;
  senderId: string;
  receiverId: string;
  mediaType: 'image' | 'pdf' | 'audio';
  messageUniqueId: string;
  receiverType: string;
}
export const sendUserUserMessage = async (socket: io.Socket, payload: SendUserUserMessagePayload) => {
  await MessageModel.create({ ...payload, messageType: 'user:user' });

  const receiver: any = await UserModel.findOne({ userType: payload.receiverType, userId: payload.receiverId });

  if (!receiver) await UserModel.create({ userId: payload.receiverId, userType: payload.receiverType, status: StatusEnum.OFFLINE });

  if (receiver && receiver.status === StatusEnum.ONLINE) {
    socket.to(receiver.currentSocketId).emit('message:receive:user:user', { ...payload });
  }

  socket.emit('message:sent', { ...payload });
};
