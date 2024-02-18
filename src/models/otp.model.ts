import mongoose, {Schema} from "mongoose";

interface OtpDoc extends Document {
    otp: string;
    userEmail: string;
  }


  const OtpSchema: Schema = new mongoose.Schema<OtpDoc>({
    otp: {
      type: String,
      required: true
    },
    userEmail: {
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
  },{ timestamps: true });


  const OtpModel = mongoose.model<OtpDoc>("otp", OtpSchema);

  export default OtpModel;