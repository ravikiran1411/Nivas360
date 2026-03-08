import mongoose from "mongoose";

const connectDb = async ()=>{
  try {
    mongoose.connection.on("connected",()=>{
      console.log("Database connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/nivas360`);
  } 
  catch (error){
    console.error("Database connection failed:",error.message);
    process.exit(1);
  }
};

export default connectDb;
