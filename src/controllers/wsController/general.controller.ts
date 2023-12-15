import { StatusEnum} from '../../common/enums';
import { IOSocket } from '../../common/types';
import RoomModel from '../../models/room.model';
import UserModel from '../../models/user.model';

export const userDisconnected = async (socket: IOSocket) => {
  // console.log(`User with socketId: ${socket.id} disconnected`);

  // get the disconnected user and update
//   const user = await UserModel.findOneAndUpdate({ currentSocketId: socket.id }, { status: StatusEnum.OFFLINE, currentSocketId: null }, { new: true });

//   if (!user) return;

//   if (user.userType === UserTypeEnum.GUEST) {
//     // emit  event to all other admins
//     const adminUsers = await UserModel.find({ userType: UserTypeEnum.ADMIN, status: StatusEnum.ONLINE });

//     socket.to(adminUsers.map(admin => admin.currentSocketId)).emit('user:disconnected', { userId: user.userId, userType: user.userType });

//     return;
//   }

//   if (user.userType === UserTypeEnum.ADMIN) {
//     // get all the rooms the  admin is in and emit event to the users in the rooms

//     const rooms = await RoomModel.find({ currentAdminId: user.userId });

//     const ordinaryUsers = (await Promise.allSettled(rooms.map(room => UserModel.findOne({ userId: room.userId }))))
//       .filter(res => res.status === 'fulfilled')
//       .map((res: any) => res.value);

//     if (rooms.length > 0) {
//       socket.to(ordinaryUsers.map(user => user.currentSocketId)).emit('admin:left');
//     }

//     // emit  event to all other admins
//     const adminUsers = await UserModel.find({ userType: UserTypeEnum.ADMIN, status: StatusEnum.ONLINE, currentSocketId: { $ne: socket.id } });

//     rooms.forEach(room => {
//       socket.to(adminUsers.map(admin => admin.currentSocketId)).emit('another:admin:left', { roomId: room._id });
//     });

//     // update all rooms
//     await RoomModel.updateMany({ currentAdminId: user.userId }, { currentAdmin: null, currentAdminId: null });

//     return;
//   }

//   if (user.userType !== UserTypeEnum.ADMIN && user.userType !== UserTypeEnum.GUEST) {
//     const allOnlineUsers = await UserModel.find({ status: StatusEnum.ONLINE, userType: { $ne: UserTypeEnum.GUEST } });

//     if (allOnlineUsers.length > 0) {
//       socket.to(allOnlineUsers.map(user => user.currentSocketId)).emit('user:disconnected', { userId: user.userId, userType: user.userType });
//     }
//   }
};
