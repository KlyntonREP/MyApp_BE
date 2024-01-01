const createPost = {
    tags: ["Posts"],
    description: "Create a new post",
    operationId: "createPost",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
        content: {
            "multipart/form-data": {
                schema: {
                    $ref: "#/components/schemas/createPostBody",
                },
            },
        },
        required: true,
    },
    responses: {
        "201": {
            description: "Post created successfully!",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            caption: {
                                type: "string",
                                example: "Interview with John Doe",
                            },
                            image: {
                                type: "string",
                                example:
                                    "https://trillbucket.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                            },
                            video: {
                                type: "string",
                                example:
                                    "https://trillbucket.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVUFWEGUWFEGA4HDMKDBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                            },
                        },
                    },
                },
            },
        },
        "400": {
            description: "Failed to create post",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Failed to create post",
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

const getPosts = {
    tags: ["Posts"],
    description:
      "Get Posts Of People You Are Following",
    operationId: "getPosts",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      "200": {
        description: "Posts Gotten Successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Posts Gotten Successfully",
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
      "400": {
        description: "Please follow someone to be able to view posts",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Please follow someone to be able to view posts",
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




const createPostBody = {
    type: "object",
    properties: {
      caption: {
        type: "string",
        example: "Interview with John Doe",
        required: "true",
      },
      image: {
        type: "file",
        format: "binary",
        required: "true",
      },
      video: {
        type: "file",
        format: "binary",
      },
    },
  };

  export{
    createPostBody,
    createPost,
    getPosts
  }