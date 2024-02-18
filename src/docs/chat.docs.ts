

const createChat = {
    tags: ["Chats"],
    description: "Create new chat",
    operationId: "createChat",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
        {
          name: "counterPartyId",
          in: "path",
          description: "This Id is the Id Of The User That u want To Message",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
    requestBody: {
        content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/createChatBody",
              },
            },
          },
          required: true,
    },
    responses: {
        "201": {
            description: "Chat Created Successfully!",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Chat Created Successfully",
                    },
                  },
                },
              },
            },
        },
        "200": {
            description: "Chat Exists, Please Continue Chatting",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Chat Exists, Please Continue Chatting",
                    },
                  },
                },
              },
            },
        },
        "404": {
            description: "User Not Found",
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
                            error: {
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

// get User Chats(gets all the chats of the current logged in user)
const getUserChats = {
    tags: ["Chats"],
    description:
      "This endpoint gets all the chats of the current logged in user",
    operationId: "getUserChats",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Chats Found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Chats Found",
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

// gets the chat between a logged in user and another user
const getUsersChat = {
    tags: ["Chats"],
    description:
      "This endpoint gets the chat between a logged in user and another user",
    operationId: "getUsersChat",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "counterPartyId",
        in: "path",
        description: "This Id is the Id Of The User Profile To Be Fetched",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      "200": {
        description: "Chat Fetched Successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Chat Fetched Successfully",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "User Not Found",
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

  const sendMessage = {
    tags: ["Chats"],
    description: "Send Message",
    operationId: "sendMessage",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
        content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/createChatBody",
              },
            },
          },
          required: true,
    },
    responses: {
        "201": {
            description: "Message Sent Successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Message Sent Successfully",
                    },
                  },
                },
              },
            },
        },
        "200": {
            description: "Group Message Sent Successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Group Message Sent Successfully",
                    },
                  },
                },
              },
            },
        },
        "404": {
            description: "Chat Does Not Exist",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Chat Does Not Exist",
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
                            error: {
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

const getMessages = {
    tags: ["Chats"],
    description:
      "This endpoint gets messages of a particular chat",
    operationId: "getMessages",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "chatId",
        in: "path",
        description: "This Id is the Id Of The Chat That u Want To Fetch Its Messages",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      "200": {
        description: "Messages Fetched Successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Messages Fetched Successfully",
                },
              },
            },
          },
        },
      },
      "404": {
        description: "No Messages Found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "No Messages Found",
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

  const createGroup = {
    tags: ["Chats"],
    description: "Create group",
    operationId: "createGroup",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
        "201": {
            description: "Group Created Successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Group Created Successfully",
                    },
                  },
                },
              },
            },
        },
        "401": {
            description: "Group Members Cannot Be More Than 10",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Group Members Cannot Be More Than 10",
                    },
                  },
                },
              },
            },
        },
        "404": {
            description: "Cannot Create Group, Please Try Again",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Cannot Create Group, Please Try Again",
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
                            error: {
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

const createChatBody = {
    type: "object",
    properties: {
      text: {
        type: "string",
        example: "John",
      },
      chatId: {
        type: "string",
        example: "Snow",
      },
      senderId: {
        type: "string",
        example: "Snow",
      },
      receiverId: {
        type: "string",
        example: "Snow",
      },
      isMedia: {
        type: Boolean,
        example: false
      },
      media: {
        type: "string",
        example: "Snow",
      },
    mediaType: {
        type: "string",
        example:" 'image' | 'pdf' | 'audio'"
    },
    messageUniqueId: {
        type: "string",
        example: "Snow",
      },
    },
  };

export{
    createChatBody,
    createChat,
    getUserChats,
    getUsersChat,
    sendMessage,
    getMessages,
    createGroup
}