import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId:{type:mongoose.Schema.Types.ObjectId,ref:"chat",required:true},
    senderId:{type:mongoose.Schema.Types.ObjectId,ref: "user",required:true},
    text:{type:String,required:true},
    seen:{type:Boolean,default:false},
  },

  {timestamps:true}
);

const messageModel = mongoose.models.message || mongoose.model("message",messageSchema);

export default messageModel;
