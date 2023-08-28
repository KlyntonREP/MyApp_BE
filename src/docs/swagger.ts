import config from "../config/environment";
import {
  createUser,
  createUserBody,
} from "./user.docs";

//options object for swaggerjs
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nene",
      version: "1.0.0",
      description: "An api for NeNe",
    },
    paths: {
    //   routes for the swagger docs goes here
    // for buyers
    "/user/register": {
      post: createUser,
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