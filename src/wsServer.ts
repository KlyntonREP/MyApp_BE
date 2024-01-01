// import { Server } from "socket.io";
import io from "socket.io";
import { Server } from "http"
import dotenv from "dotenv";
import { ApiError } from "./utility/apiError";
import { verifyAuthTokens } from "./utility/jwtUtility";
import chatHandler from "./utility/wsHandler/chat.handler"
import { ConnectionTypeEnum } from "./common/enums";
import { userDisconnected } from "./controllers/wsController/general.controller"
import { updateAndgetUserMessages } from "./utility/wsHandler/chatHelper.handler";

//initializing my config file
dotenv.config();


// checking if user is authenticated before connecting to then socket instance
const authMiddleware = async (socket: io.Socket, next:  (err?: ApiError) => void) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];
  // const uniqueId = socket.handshake.query?.uniqueId as string;
  const counterpartyId = socket.handshake.query?.counterpartyId as string;
  const connectionType = socket.handshake.query?.connectionType as unknown as ConnectionTypeEnum;
  console.log(token)
  console.log(counterpartyId)
  console.log(connectionType)

  if (!token) {
    
    const error = new ApiError('Unauthorized');
    error.data = { content: 'Please reconnect with a valid token' };
    next(error);
    return;
  }
    console.log(token)
    const payload = await verifyAuthTokens(token);
    if((payload as {error: any}).error){
      next((payload as {error: any}).error);
      return;
    }
    const userMessages = await updateAndgetUserMessages({
      userSocketId: socket.id,
      userId: (payload as { id: string, userName: string}).id,
      counterpartyId: counterpartyId,
      connectionType,
      socket,
    });
    socket.emit('user:conn:success', userMessages);
    return next();
}


const wsConnection = (socket: io.Socket) => {
    socket.on('disconnect', () => {
      userDisconnected(socket);
    });
    chatHandler(socket);
  };

// this block of code starts the web socket server
const createWebSocketServer = (server: Server) => {
    const wss: io.Server = new io.Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
          credentials: true,
        },
    });
    wss.use(authMiddleware);

    wss.on('connection', (socket: any) => wsConnection(socket));
    console.log('connected to web socket server')
    return wss; 
}
export default createWebSocketServer;