import mongoose, {Schema} from "mongoose";
import UserModel from "./user.model";
import MessageModel from "./messages.model";

interface RoomDoc extends Document {
    users: typeof UserModel[];
    messages: typeof MessageModel[]
    isGroup: boolean;
    lastUpdatedAt: Date;
}

  const RoomSchema: Schema = new mongoose.Schema<RoomDoc>({
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}],
    isGroup: {
      type: Boolean,
      default: false
    },
    lastUpdatedAt: {
      type: Date,
      default: new Date()
    }
  },{ timestamps: true });

  RoomSchema.pre('save', function(next){
    if(this.isGroup){
        if(this.user.length > +(process.env.MAX_GROUP_NUMBER as string)){
            next(new Error(`Maximum Number Of Users In A Group Must Not Exceed ${process.env.MAX_GROUP_NUMBER}`));
        }
    }else{
        if(this.user.length > 2){
            next(new Error("Maximum Number Of Users In A Users Room Must Not Be More Than 2"))
        }
    }
    next()
  })

const RoomModel = mongoose.model<RoomDoc>("Room", RoomSchema);
  
export default RoomModel;