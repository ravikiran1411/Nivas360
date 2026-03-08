import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    role: {type:String, enum:["user", "owner", "admin"], default: "user"},
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref:"property"}],
    resetOtp: String,
    resetOtpExpire: Date
  },
  {timestamps:true}
);

const userModel=mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;