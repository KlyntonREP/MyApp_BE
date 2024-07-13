import mongoose, { Schema, Document } from 'mongoose';
import { StatusEnum } from '../common/enums';

export interface UserDoc extends Document {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string | undefined;
    phoneNumber: string;
    image: string | null;
    gender: string | null;
    bio: string | null;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    status: string;
    refreshToken: string;
    followers: mongoose.Types.ObjectId;
    following: mongoose.Types.ObjectId;
    posts: string[];
    passwordResetToken?: string;
    verifyEmailToken?: string;
}

const UserSchema = new Schema<UserDoc>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        email: {
            required: true,
            type: String,
            unique: true,
            maxlength: 255,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please, enter a valid email'],
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minLenght: [6, 'Password must be at least 6 characters'],
        },
        image: {
            type: String,
        },
        gender: {
            type: String,
            enums: ['m', 'f', 'others'],
        },
        bio: {
            type: String,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isPhoneVerified: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: StatusEnum,
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', // Reference to the User model
                default: [],
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                default: [],
            },
        ],
        posts: {
            type: [String],
            default: [],
        },
        refreshToken: {
            type: String,
            required: false,
        },
        passwordResetToken: {
            type: String,
            required: false,
        },
        verifyEmailToken: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

const UserModel = mongoose.model<UserDoc>('User', UserSchema);

export default UserModel;
