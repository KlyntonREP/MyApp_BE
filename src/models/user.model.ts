import mongoose, {Schema} from "mongoose";

interface UserDoc extends Document {
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
    accessToken: string;
    refreshToken: string;
    followers: string[];
    following: string[];
    posts: string[];
  }

  const UserSchema: Schema = new mongoose.Schema<UserDoc>({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
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
    match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please, enter a valid email",
      ],
    },
    phoneNumber: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLenght: [6, "Password must be at least 6 characters"],
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
      enums: ["m", "f", "others"],
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
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    followers: {
      type: [String],
      default:[]
    },
    following:{
      type: [String],
      default:[]
    },
    posts:{
      type: [String],
      default:[]
    },
    accessToken: {
      type: String,
      // required: true
    },
    refreshToken: {
      type: String,
      // required: true
    },
  },{ timestamps: true });


  const UserModel = mongoose.model<UserDoc>("User", UserSchema);

  export default UserModel;