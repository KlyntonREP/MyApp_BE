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
} from "./user.docs";

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
    ],
  },
  apis: ["../routes/index.ts"],
};