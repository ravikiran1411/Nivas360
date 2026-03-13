import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    ownerId: {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    title: {type:String,required:true,trim:true},
    description: {type:String,required:true},
    purpose: {type: String,enum:["rent","sell"],required:true},
    propertyType: {type:String,enum:["flat", "individual-house", "villa", "plot"],required:true},
    bhk: {type:Number,enum:[0, 1, 2, 3]},
    price: {type:Number,required:true},
    SqYards: {type:Number,required:true},
    location: {
      city: {type:String,required:true},
      area: {type:String,required:true},
      pincode: {type:Number,required:true},
    },

    images: {type:[String],required:true},
    availability: {type:String,required:true},
    parking:{
    car:{type:Boolean,default:false},
    bike:{type:Boolean,default:false}
  }
  },
  {timestamps:true}
);

const propertyModel = mongoose.models.property || mongoose.model("property", propertySchema);

export default propertyModel;