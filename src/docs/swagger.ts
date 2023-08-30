import config from "../config/environment";
import {
  createUser,
  createUserBody,
  verifyUser,
  resendCode,
  userLogin
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