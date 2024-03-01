import express from 'express';
import { Authenticate } from '../middlewares/auth.middleware';
import {
    createChatController,
    createGroupController,
    getMessagesController,
    getUserChatsController,
    getUsersChatController,
    sendMessageController,
} from '../controllers/chat.controller';

const router = express.Router();
// initiate a chat
router.post('/create-chat/:counterPartyId', Authenticate, createChatController);

// gets all the chats of a logged in user
router.get('/user-chats', Authenticate, getUserChatsController);

// gets the chat between a logged in user and another user
router.get('/users-chat/counterPartyId', Authenticate, getUsersChatController);

router.post('/send-message', Authenticate, sendMessageController);
router.get('/get-messages/:chatId', Authenticate, getMessagesController);
router.post('/create-group', Authenticate, createGroupController);

export default router;
