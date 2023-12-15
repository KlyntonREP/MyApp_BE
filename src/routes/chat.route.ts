import {
    sendUserUserMessage,
} from '../controllers/wsController/chat.controller'
import io from 'socket.io';

export default function chatHandler(socket: io.Socket) {
    // ! Validate all user inputs (payloads)
    socket.on('send:message:user:user', (payload: any) => sendUserUserMessage(socket, payload));
}