import { ConnectionTypeEnum, MessageStatusEnum, StatusEnum} from '../../common/enums';
import RoomModel from '../../models/room.model';
import UserModel from '../../models/user.model';
import io from 'socket.io';
import MessageModel from "../../models/messages.model";


export const updateAndgetUserMessages = async ({
    userSocketId,
    userId,
    counterpartyId,
    connectionType,
    socket,
  }: {
    userSocketId: string;
    userId?: string;
    counterpartyId: string | string[];
    connectionType: ConnectionTypeEnum;
    socket: io.Socket;
  }) => {
    await UserModel.findOneAndUpdate({ _id: userId },
      {
        currentSocketId: userSocketId,
        status: StatusEnum.ONLINE,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  
  // 1. Get rooms
  const getRooms = await RoomModel.find({ users: {$elemMatch:{ _id: userId }}}).populate('Message').sort({ lastUpdatedAt: -1 })
  //3. combine and sort them (For room: sort based on last time the room was updated; For message: sort based on createdAt)
  return getRooms
  
  };