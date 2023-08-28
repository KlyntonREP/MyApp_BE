const createUser = {
    tags: ["Users"],
    description: "Create a new user",
    operationId: "createUser",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/createUserBody",
          },
        },
      },
      required: true,
    },
    responses: {
      "201": {
        description: "User created successfully!",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  example: "User created successfully! Please check your mail",
                },
              },
            },
          },
        },
      },
      "409": {
        description: "User already exists",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  example: "User already exists",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "passwords do not match",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  example: "Password Mismatch",
                },
              },
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                msg: {
                  type: "string",
                  example: "Something went wrong! Please try again",
                },
              },
            },
          },
        },
      },
    },
  };

const createUserBody = {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        example: "John",
      },
      lastName: {
        type: "string",
        example: "Snow",
      },
      userName: {
        type: "string",
        example: "Snow",
      },
      email: {
        type: "string",
        example: "johnsnow@email.com",
      },
      phone: {
        type: "string",
        example: "+1234567890",
      },
      password: {
        type: "string",
        description: "unencrypted user's password",
        example: "!1234aWe1Ro3$#",
      },
      confirmPassword: {
        type: "string",
        description: "unencrypted user's password",
        example: "!1234aWe1Ro3$#",
      },
    },
  };
  
  export {
    createUser,
    createUserBody,
  };