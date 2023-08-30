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

const verifyUser = {
  tags: ["Users"],
  description: "Verify a user",
  operationId: "verifyUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            verification_code: {
              description: "Verification code that was sent to the user's email",
              type: "number",
              example: 982345,
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Veification Successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Verification Successful!!!",
              },
            },
          },
        },
      },
    },
  },
  "401": {
    description: "User Already Verified",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "This user is already verified",
            },
          },
        },
      },
    },
  },
  "400": {
    description: "Invalid verification code",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            msg: {
              type: "string",
              example: "Invalid Verification Code",
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
}


const userLogin = {
  tags: ["Users"],
  description: "Login a vendor using email or username and password",
  operationId: "loginVendor",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              description: "Email of the user",
              type: "string",
              example: "johndoe@gmail.com",
            },
            password: {
              type: "string",
              description: "unencrypted user's password",
              example: "!1234aWe1Ro3$#",
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    "200": {
      description: "Login successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "94ty-hfuw-ftr3-tu5t",
              },
              username: {
                type: "string",
                example: "John",
              },
              token: {
                type: "string",
                example:
                  "f42r4urh84u3395t53t53gng35jt93.fu3u4t40yhwwrfr2.fu349tu3udvwrf394uu",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Email not yet verified",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example:
                  "Please Activate Your Account By Confirming Your Email Address",
              },
            },
          },
        },
      },
    },
    "401": {
      description: "Invalid email/username or password",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Invalid Credentials",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "No Such User",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "User Not Found",
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
                example: "Error Logging In",
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
    verifyUser,
    userLogin
  };