import ownerRequestModel from "../models/ownerRequestModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const requestOwnerPermission = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!req.file) {
      return res.json({success: false, message: "Document required"});
    }

    const exists = await ownerRequestModel.findOne({
      userId: req.userId,
      status: "pending"
    });

    if (exists) {
      return res.json({success: false, message: "Request already pending" });
    }

    const filePath = req.file.path.replace(/\\/g, "/");


const uploadResult = await cloudinary.uploader.upload(filePath, {
  folder: "owner_documents",
  resource_type: "image"
});

    // delete file after upload
    fs.unlinkSync(filePath);

    const request = await ownerRequestModel.create({
      userId: req.userId,
      phone,
      document: uploadResult.secure_url,
      status: "pending"
    });

    res.json({success: true,message: "Request sent to admin",request });
  } 
  catch (error) {
    res.json({success: false, message: error.message});
  }
};


const getOwnerRequestStatus = async (req, res) => {
  try {
    const request = await ownerRequestModel.findOne({userId: req.userId});

    if (!request) {
      return res.json({success: true,status: "none"});
    }

    res.json({success: true, status: request.status});
  } 
  catch (error) {
    res.json({success: false,message: error.message});
  }
};

export { requestOwnerPermission,getOwnerRequestStatus };