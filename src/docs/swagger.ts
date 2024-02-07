import config from "../config/environmentVariables";
import {
  createUser,
  createUserBody,
  verifyUser,
  resendCode,
  userLogin,
  forgotPassEmail,
  forgotPassPhone,
  resetPass,
  followUser,
  unfollowUser,
  updateProfile,
  getProfile,
  getUserById,
  editEmail,
  changeEmail,
} from "./user.docs";

import{
  createPostBody,
  createPost,
  getPosts
}from "./post.docs"

import{
  createChatBody,
  createChat,
  getUserChats,
  getUsersChat,
  sendMessage,
  getMessages
}from "./chat.docs"
//options object for swaggerjs
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My App",
      version: "1.0.0",
      description: "An api documentation for My_App",
    },
    paths: {
    //   routes for the swagger docs goes here

    // for user
      "/user/register": {
        post: createUser,
      },
      "/user/verify": {
        post: verifyUser,
      },
      "/user/resend-code": {
        post: resendCode,
      },
      "/user/login": {
        post: userLogin,
      },
      "/user/forgot-password-email": {
        post: forgotPassEmail,
      },
      "/user/forgot-password-phone": {
        post: forgotPassPhone,
      },
      "/user/reset-password": {
        post: resetPass,
      },
      "/user/update-profile": {
        put: updateProfile,
      },
      "/user/edit-email": {
        post: editEmail,
      },
      "/user/change-email": {
        put: changeEmail,
      },
      "/user/profile": {
        get: getProfile,
      },
      "/user/profile/{userId}": {
        get: getUserById,
      },
      "/user/follow/{followId}": {
        post: followUser,
      },
      "/user/unfollow/{unfollowId}": {
        post: unfollowUser,
      },

      //for posts
      "/post/create-post": {
        post: createPost,
      },
      "/post/get-posts": {
        get: getPosts,
      },


      //for chats
      "/chats/create-chat/{counterpartyId}":{
        post: createChat,
      },
      "/chats/user-chats":{
        get: getUserChats
      },
      "/chats/users-chat/{counterPartyId}":{
        get: getUsersChat
      },
      "/chats/send-message":{
        post: sendMessage
      },
      "/chats/get-messages/{chatId}":{
        get: getMessages
      }
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        createUserBody,
        createPostBody,
        createChatBody,
      },
    },
    servers: [
      {
        //update to production url
        url: `${config.BASE_URL}/api/`,
      },
    ],
    tags: [
      {
        name: "Users",
      },
      {
        name: "Posts",
      },
      {
        name: "Chats",
      },
    ],
  },
  apis: ["../routes/index.ts"],
};