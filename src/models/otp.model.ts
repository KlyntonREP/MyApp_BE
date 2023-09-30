import mongoose, {Schema} from "mongoose";

interface OtpDoc extends Document {
    otp: string;
    userEmail: string,
    expiresAt: Date;
  }

  const OtpSchema: Schema = new mongoose.Schema<OtpDoc>({
    otp: {
        type: String,
        required: true,
    },
    userEmail:{
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
    // expiresAt: {
    //     type: Date,
    //     default: Date.now(),
    //     index: { expires: '5m' },
    // }
    
  },{ timestamps: true });

  OtpSchema.index({createdAt: 1},{expireAfterSeconds: 600});

  const OtpModel = mongoose.model<OtpDoc>("Otp", OtpSchema);
  
  export default OtpModel;