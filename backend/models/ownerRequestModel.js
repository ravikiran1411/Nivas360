import mongoose from "mongoose";

const ownerRequestSchema = new mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    phone:{type:String, required:true},
    document: {type: String, required:true},
    status: {type: String, enum: ["pending", "approved", "rejected"], default: "pending"},
    reviewedAt: {type:Date}
  },
  {timestamps:true}
);

const ownerRequestModel = mongoose.models.ownerRequest || mongoose.model("ownerRequest", ownerRequestSchema);

export default ownerRequestModel;
