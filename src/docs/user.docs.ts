const createUser = {
    tags: ['Users'],
    description: 'Create a new user',
    operationId: 'createUser',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createUserBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'User created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'User created successfully! Please check your mail',
                            },
                        },
                    },
                },
            },
        },
        '409': {
            description: 'User already exists',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'User already exists',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'passwords do not match',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Password Mismatch',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Something went wrong! Please try again',
                            },
                        },
                    },
                },
            },
        },
    },
};

const verifyUser = {
    tags: ['Users'],
    description: 'Verify a user endpoint. Send the Email as payload(in the body not params) when using this endpoint',
    operationId: 'verifyUser',
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            description: "This email won't be visible to the users on the frontend",
                            type: 'string',
                            example: 'johndoe@gmail.com',
                        },
                        otp: {
                            description: "Verification code that was sent to the user's email",
                            type: 'string',
                            example: '982345',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Veification Successful',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Verification Successful!!!',
                            },
                        },
                    },
                },
            },
        },
    },
    '401': {
        description: 'User Already Verified',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'This user is already verified',
                        },
                    },
                },
            },
        },
    },
    '400': {
        description: 'Code Expired',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Code Has Expired Please Request For A New One',
                        },
                    },
                },
            },
        },
    },
    '409': {
        description: 'Invalid verification code',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Invalid Verification Code',
                        },
                    },
                },
            },
        },
    },
    '500': {
        description: 'Internal Server Error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        msg: {
                            type: 'string',
                            example: 'Something went wrong! Please try again',
                        },
                    },
                },
            },
        },
    },
};

const resendCode = {
    tags: ['Users'],
    description: 'Resending Verification Code',
    operationId: 'verifyUserMail',
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            description: 'Email of the user',
                            type: 'string',
                            example: 'johndoe@gmail.com',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Veification code sent',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Verification code sent, kindly check your mail',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Email not sent',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Error Occured While Sending Mail',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User does not exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'User does not exist',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Something went wrong! Please try again',
                            },
                        },
                    },
                },
            },
        },
    },
};

const userLogin = {
    tags: ['Users'],
    description: 'Login a vendor using email or username and password',
    operationId: 'loginVendor',
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            description: 'Email of the user',
                            type: 'string',
                            example: 'johndoe@gmail.com',
                        },
                        password: {
                            type: 'string',
                            description: "unencrypted user's password",
                            example: '!1234aWe1Ro3$#',
                        },
                    },
                },
            },
            required: true,
        },
    },
    responses: {
        '200': {
            description: 'Login Successful',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Login Successful',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Email not yet verified',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Please Activate Your Account By Confirming Your Email Address',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Invalid email/username or password',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid Credentials',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'No Such User',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Error Logging In',
                            },
                        },
                    },
                },
            },
        },
    },
};

const forgotPassEmail = {
    tags: ['Users'],
    description: "Send password reset link to the user's email",
    operationId: 'forgotPasswordEmail',
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            description: 'Email of the user',
                            type: 'string',
                            example: 'johndoe@gmail.com',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Reset Password code sent',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Rest Password code Sent successfully! Please check your mail',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User does not exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No User With This Email',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Error Sending Email',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Oops! Something went wrong. Could not send email. Please try again',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const forgotPassPhone = {
    tags: ['Users'],
    description: 'Send password reset code to the users phone number',
    operationId: 'forgotPasswordPhone',
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        phoneNumber: {
                            description: 'Phone Number Of User',
                            type: 'string',
                            example: '081******94',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Reset Password code sent',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Rest Password code Sent successfully! Please check your messages',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User does not exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'No User With This Phone Number',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Error Sending Message',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Oops! Something went wrong. Could not send Message. Please try again',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        },
    },
};

const resetPass = {
    tags: ['Users'],
    description:
        'Reset User Password By Using The Code Sent From Forgot Password Endpoint. Send The Email As payload(It should not be visible to users)',
    operationId: 'resetpassword',
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
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            description: 'Email address',
                            type: 'string',
                            example: 'Johndoe@gmail.com',
                        },
                        code: {
                            description: 'Reset Password Code',
                            type: 'string',
                            example: '123456',
                        },
                        password: {
                            description: 'new unencrypted vendor password',
                            type: 'string',
                            example: '!1234aWe1Ro3$#',
                        },
                        confirmPassword: {
                            description: 'confirm unencrypted vendor password',
                            type: 'string',
                            example: '!1234aWe1Ro3$#',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Password Reset Successful',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Password Reset Successfully!',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Invalid code',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid Code',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Passwords Do Not Match',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Passwords Do Not Match!',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const updateProfile = {
    tags: ['Users'],
    description: 'Update Profile',
    operationId: 'updateProfile',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        fullName: {
                            description: "User's Full Name",
                            type: 'string',
                            example: 'John Doe',
                        },
                        userName: {
                            description: "User's Username",
                            type: 'string',
                            example: 'JohnDoe',
                        },
                        bio: {
                            description: 'Bio, About User',
                            type: 'string',
                            example: "This Is My Bio. It's About Me",
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'User Profile Updated Successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Profile Updated Successfully',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'This User Has Already Been Taken',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'This User Has Already Been Taken',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'User Does Exist',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Does Exist',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const editEmail = {
    tags: ['Users'],
    description: 'In the update profile, when changing your email. The user will be required to input an OTP',
    operationId: 'editEmail',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            description: "User's Email Address",
                            type: 'string',
                            example: 'JohnDoe@gmail.com',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Email Change Code Sent Successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Email Change Code Sent Successfully',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Error Sending Email',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Sending Email',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'This Email Address Does Not Exist On Your Account',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'This Email Address Does Not Exist On Your Account',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const changeEmail = {
    tags: ['Users'],
    description: 'Change the user email',
    operationId: 'changeEmail',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        otp: {
                            description: 'Otp sent to user email',
                            type: 'string',
                            example: '123456',
                        },
                        email: {
                            description: "User's Email Address",
                            type: 'string',
                            example: 'JohnDoe@gmail.com',
                        },
                    },
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Email Changed Successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Email Changed Successfully',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Code Has Expired Please Request For A New One',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Code Has Expired Please Request For A New One',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: 'Invalid OTP',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Invalid OTP',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const getProfile = {
    tags: ['Users'],
    description: 'Get User Profile',
    operationId: 'getProfile',
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        '200': {
            description: 'User Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Found',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const getUserById = {
    tags: ['Users'],
    description: 'Get Other User Profile',
    operationId: 'getUserById',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'userId',
            in: 'path',
            description: 'This Id is the Id Of The User Profile To Be Fetched',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        '200': {
            description: 'User Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Found',
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const followUser = {
    tags: ['Users'],
    description: 'Follow A User',
    operationId: 'followUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'followId',
            in: 'path',
            description: 'This Id is the Id Of The User To Be Followed',
            required: true,
            schema: {
                type: 'string',
            },
        },
        // {
        //   name: "Token",
        //   in: "path",
        //   description: "This Is The Token Sent To The Vendors's Email",
        //   required: true,
        //   schema: {
        //     type: "string",
        //   },
        // },
    ],
    responses: {
        '200': {
            description: 'Followed User Successfuly',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Followed User Successfuly!',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: 'Already Following This User. Cannot Follow User Twice',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Already Following This User. Cannot Follow User Twice',
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: "Can't Follow This User, They Do Not Exist",
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: "Can't Follow This User, They Do Not Exist!",
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const unfollowUser = {
    tags: ['Users'],
    description: 'Unfollow A User',
    operationId: 'unfollowUser',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            name: 'unfollowId',
            in: 'path',
            description: 'This Id is the Id Of The User To Be Unfollowed',
            required: true,
            schema: {
                type: 'string',
            },
        },
        // {
        //   name: "Token",
        //   in: "path",
        //   description: "This Is The Token Sent To The Vendors's Email",
        //   required: true,
        //   schema: {
        //     type: "string",
        //   },
        // },
    ],
    responses: {
        '200': {
            description: 'User Unfollowed Successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Unfollowed Successfully!',
                            },
                        },
                    },
                },
            },
        },
        '400': {
            description: "Can't Unfollow User A You Are Not Following",
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: "Can't Unfollow A User You Are Not Following",
                            },
                        },
                    },
                },
            },
        },
        '401': {
            description: "Can't Unfollow This User, They Do Not Exist",
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: "Can't Unfollow This User, They Do Not Exist!",
                            },
                        },
                    },
                },
            },
        },
        '404': {
            description: 'User Not Found',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'User Not Found',
                            },
                        },
                    },
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Error Reseting Password',
                            },
                        },
                    },
                },
            },
        },
    },
};

const createUserBody = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            example: 'John',
        },
        lastName: {
            type: 'string',
            example: 'Snow',
        },
        userName: {
            type: 'string',
            example: 'Snow',
        },
        email: {
            type: 'string',
            example: 'johnsnow@gmail.com',
        },
        phone: {
            type: 'string',
            example: '+2347034864987',
        },
        password: {
            type: 'string',
            description: "unencrypted user's password",
            example: '!1234aWe1Ro3$#',
        },
        confirmPassword: {
            type: 'string',
            description: "unencrypted user's password",
            example: '!1234aWe1Ro3$#',
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
    resetPass,
    updateProfile,
    editEmail,
    changeEmail,
    getProfile,
    getUserById,
    followUser,
    unfollowUser,
};
