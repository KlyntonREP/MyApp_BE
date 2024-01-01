import {} from "../../controllers/wsController/chat.controller";
  import io from 'socket.io';
  
  export default function chatHandler(socket: io.Socket) {
    // // ! Validate all user inputs (payloads)
  
    // socket.on('send:message:user:user', (payload: any) => sendUserUserMessage(socket, payload));
  
    // socket.on('send:message:user:admin', (payload: any) => sendUserAdminMessage(socket, payload));
  
    // socket.on('fetch:rooms', () => fetchRooms(socket));
  
    // socket.on('fetch:messages', (payload: any) => fetchMessages(socket, payload));
  
    // socket.on('read:message', (payload: any) => readMessage(socket, payload));
  
    // // ? To do
    // socket.on('chat:typing', (payload: any) => socket.to(`chat:${payload.chat}`).emit('chat:typing', payload));
  
    // // ? To do
    // socket.on('chat:stop-typing', (payload: any) => socket.to(`chat:${payload.chat}`).emit('chat:stop-typing', payload));
  
    // socket.on('admin:join:room', (payload: any) => adminJoinRoom(socket, payload));
  
    // socket.on('admin:leave:room', (payload: any) => adminLeaveRoom(socket, payload));
  }
  