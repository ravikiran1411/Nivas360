import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import sendOtpEmail from "../utility/sendEmail.js";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    // Email not found
    if (!user) {
      return res.json({success: false, message: "Email not registered"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    //  Password incorrect
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password"});
    }

    //  Login success
    const token = createToken(user._id);
    return res.json({success: true,token});
  } 
  catch (error) {
    console.log(error);
    return res.json({success: false,message: error.message});
  }
};

// route for user registration
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        // check if already user exists
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        // validate email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"please enter a strong password"})
        }
        // hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user=await newUser.save()

        const token=createToken(user._id)
        res.json({success:true,token})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


// forgot password
const forgotPassword=async (req,res)=>{
  try{
    const {email}=req.body;
    const user=await userModel.findOne({email});
    if(!user){
      return res.json({success:false,message:"User not found"});
    }

    const otp=Math.floor(100000+Math.random()* 900000).toString();

    const hashedOtp=crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.resetOtp=hashedOtp;
    user.resetOtpExpire=Date.now()+10*60*1000;

    await user.save();
    await sendOtpEmail(email,otp);

    res.json({success:true,message:"OTP sent to email" });
  } 
  catch(error){
    res.json({success:false,message: error.message });
  }
};

// verify otp
const verifyOtp=async (req,res)=>{
  const {email,otp}=req.body;

  const hashedOtp=crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  const user=await userModel.findOne({
    email,
    resetOtp: hashedOtp,
    resetOtpExpire:{$gt:Date.now()},
  });

  if(!user){
    return res.json({success:false,message:"Invalid or expired OTP"});
  }

  res.json({success:true,message:"OTP verified" });
};

// reset password
const resetPassword=async (req,res)=>{
  const {email,password,confirmPassword}=req.body;

  if (password !== confirmPassword){
    return res.json({success: false,message:"Passwords do not match" });
  }

  if (password.length < 8){
    return res.json({success: false,message:"Password too short" });
  }

  const user=await userModel.findOne({email});
  if (!user){
    return res.json({success:false,message:"User not found" });
  }

  const salt=await bcrypt.genSalt(10);
  user.password=await bcrypt.hash(password,salt);

  user.resetOtp=undefined;
  user.resetOtpExpire=undefined;

  await user.save();

  res.json({success:true,message:"Password reset successful" });
};

// get user profile
const getProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select("-password")
      .populate("wishlist");

    res.json({ success: true, user });
  } 
  catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {loginUser,registerUser,forgotPassword,verifyOtp,resetPassword,getProfile}