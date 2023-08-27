import config from "../config/environment";

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
        // createUserBody,
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
        name: "Buyers",
      },
      {
        name: "Vendors",
      },
      {
        name: "Categories",
      },
      {
        name: "Products",
      },
    ],
  },
  apis: ["../routes/index.ts"],
};