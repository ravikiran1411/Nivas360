import ownerRequestModel from "../models/ownerRequestModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

// 1.Admin login
const adminLogin = async (req,res)=>{
  try {
    const {email,password} = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign({email, isAdmin:true}, process.env.JWT_SECRET, {expiresIn:"7d"});

      return res.json({success:true, message:"Login successful", token});
    }

    return res.json({success: false, message:"Invalid credentials"});

  } 
  catch (error) {
    res.json({success:false, message:error.message});
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const requests = await ownerRequestModel
      .find({ status: "pending" })
      .populate("userId", "name email")
      .sort({createdAt:-1});

    res.json({success:true, requests});

  } 
  catch (error) {
    res.json({success:false, message:error.message});
  }
};



const getApprovedRequests = async (req,res)=>{
  try {
    const requests = await ownerRequestModel
      .find({ status: "approved" })
      .populate("userId", "name email");

    res.json({success:true, requests});

  } 
  catch (error) {
    res.json({success:false, message:error.message});
  }
};

const approveRequest = async (req,res)=>{
  try {
    const {requestId} = req.body;

    const request = await ownerRequestModel.findById(requestId);

    if (!request) {
      return res.json({success:false, message:"Request not found"});
    }

    request.status = "approved";
    request.reviewedAt = new Date();
    await request.save();

    // Update user role to owner
    await userModel.findByIdAndUpdate(request.userId, {role:"owner"});

    res.json({success:true, message:"User approved as Owner"});

  } 
  catch (error){
    res.json({success:false, message:error.message});
  }
};


const rejectRequest = async (req, res) => {
  try {
    const {requestId} = req.body;

    const request = await ownerRequestModel.findById(requestId);

    if (!request) {
      return res.json({success: false, message:"Request not found"});
    }

    request.status = "rejected";
    request.reviewedAt = new Date();
    await request.save();

    res.json({success:true, message:"Request rejected"});

  } 
  catch (error){
    res.json({success:false, message:error.message });
  }
};


const listOwners = async (req,res)=>{
  try {
    const owners = await userModel
      .find({ role: "owner" })
      .select("name email");

    res.json({success:true, owners});

  } 
  catch (error){
    res.json({success:false, message:error.message});
  }
};


const removeOwner = async (req,res)=>{
  try {
    const {userId} = req.body;

    await userModel.findByIdAndUpdate(userId, {role: "user"});

    res.json({success:true, message:"Owner role removed"});
  } 
  catch (error){
    res.json({success:false, message:error.message});
  }
};

const getDashboardStats = async (req,res)=>{
  try {
    const pendingCount = await ownerRequestModel.countDocuments({status:"pending"});

    const approvedCount = await ownerRequestModel.countDocuments({status:"approved"});

    const today = new Date();
    today.setHours(0,0,0,0);

    const newTodayCount = await ownerRequestModel.countDocuments({createdAt: { $gte: today }});

    res.json({success:true,stats:{pendingCount,approvedCount,newTodayCount}});
  } 
  catch(error){
    res.json({success:false,message:error.message});
  }
};

export {adminLogin,getPendingRequests,getApprovedRequests,approveRequest,rejectRequest,listOwners,removeOwner,getDashboardStats};
