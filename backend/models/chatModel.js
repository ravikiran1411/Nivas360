import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    lastMessage:String 
},

{timestamps:true}
);

const chatModel = mongoose.models.chat || mongoose.model("chat",chatSchema);

export default chatModel;
