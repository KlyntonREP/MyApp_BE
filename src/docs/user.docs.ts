const createUser = {
    tags: ["Users"],
    description: "Create a new user",
    operationId: "createUser",
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
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
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

const resendCode = {
  tags: ["Users"],
  description: "Resending Verification Code",
  operationId: "verifyUserMail",
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
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
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Veification code sent",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Verification code sent, kindly check your mail",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Email not sent",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Error Occured While Sending Mail",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "User does not exist",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "User does not exist",
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

const userLogin = {
  tags: ["Users"],
  description: "Login a vendor using email or username and password",
  operationId: "loginVendor",
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
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

const forgotPassEmail = {
  tags: ["Users"],
  description: "Send password reset link to the user's email",
  operationId: "forgotPasswordEmail",
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
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
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Reset Password code sent",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example:
                  "Rest Password code Sent successfully! Please check your mail",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "User does not exist",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "No User With This Email",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Error Sending Email",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Oops! Something went wrong. Could not send email. Please try again",
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
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const forgotPassPhone = {
  tags: ["Users"],
  description: "Send password reset code to the users phone number",
  operationId: "forgotPasswordPhone",
  // security: [
  //   {
  //     bearerAuth: [],
  //   },
  // ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            phoneNumber: {
              description: "Phone Number Of User",
              type: "string",
              example: "081******94",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Reset Password code sent",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example:
                  "Rest Password code Sent successfully! Please check your messages",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "User does not exist",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "No User With This Phone Number",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Error Sending Message",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Oops! Something went wrong. Could not send Message. Please try again",
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
              message: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const resetPass = {
  tags: ["Users"],
  description:
    "Reset User Password By Using The Code Sent From Forgot Password Endpoint",
  operationId: "resetpassword",
  security: [
    {
      bearerAuth: [],
    },
  ],
  // parameters: [
  //   {
  //     name: "Id",
  //     in: "path",
  //     description: "This Id Is The Vendors's ID",
  //     required: true,
  //     schema: {
  //       type: "string",
  //     },
  //   },
  //   {
  //     name: "Token",
  //     in: "path",
  //     description: "This Is The Token Sent To The Vendors's Email",
  //     required: true,
  //     schema: {
  //       type: "string",
  //     },
  //   },
  // ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            code: {
              description: "Reset Password Code",
              type: "string",
              example: "123456",
            },
            password: {
              description: "new unencrypted vendor password",
              type: "string",
              example: "!1234aWe1Ro3$#",
            },
            confirmPassword: {
              description: "confirm unencrypted vendor password",
              type: "string",
              example: "!1234aWe1Ro3$#",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Password Reset Successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Password Reset Successfully!",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Invalid code",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Invalid Code",
              },
            },
          },
        },
      },
    },
    "401": {
      description: "Passwords Do Not Match",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Passwords Do Not Match!",
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
              message: {
                type: "string",
                example: "Error Reseting Password",
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
      example: "johnsnow@gmail.com",
    },
    phone: {
      type: "string",
      example: "+2347034864987",
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
  resendCode,
  userLogin,
  forgotPassEmail,
  forgotPassPhone,
  resetPass
};