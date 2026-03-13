import { v2 as cloudinary } from "cloudinary";
import propertyModel from "../models/propertyModel.js";

//1.Add Property
const addProperty = async (req, res) => {
  try {
    const images = req.files;
    if (!images || images.length === 0) {
      return res.json({ success:false, message:"Images required" });
    }

    if(images.length > 6){
      return res.json({ success:false, message:"Maximum 6 images allowed" });
    }

    const imageUrls = await Promise.all(
      images.map(async (file)=>{
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
      })
    );

    const parking = req.body.parking ? JSON.parse(req.body.parking) : { car:false, bike:false };

    const property = await propertyModel.create({
      ownerId:req.userId,
      title:req.body.title,
      description:req.body.description,
      purpose:req.body.purpose,
      propertyType:req.body.propertyType,
      bhk:req.body.propertyType === "plot" ? undefined : Number(req.body.bhk),
      price:Number(req.body.price),
      SqYards:Number(req.body.SqYards),
      location:{
        city:req.body.city,
        area:req.body.area,
        pincode:Number(req.body.pincode)
      },
      availability:req.body.availability,
      parking,
      images:imageUrls
    });
    res.json({ success:true, property });
  }
  catch(error){
    res.json({ success:false, message:error.message });
  }
};


//2.Update Property
const updateProperty = async (req, res) => {
  try {
    const property = await propertyModel.findOne({
      _id: req.body.propertyId,
      ownerId: req.userId
    });

    if (!property) {
      return res.json({ success:false, message:"Unauthorized" });
    }

    property.title = req.body.title;
    property.description = req.body.description;
    property.purpose = req.body.purpose;
    property.propertyType = req.body.propertyType;

    property.bhk = req.body.propertyType === "plot" ? undefined : Number(req.body.bhk);

    property.price = Number(req.body.price);
    property.SqYards = Number(req.body.SqYards);

    property.location = {
      city: req.body.city,
      area: req.body.area,
      pincode: Number(req.body.pincode)
    };

    property.availability = req.body.availability;

    if(req.body.propertyType === "plot"){
      property.parking = { car:false, bike:false };
    }
    else if(req.body.parking){
      property.parking = JSON.parse(req.body.parking);
    }

    let images = [];

    if(req.body.existingImages){
      images = JSON.parse(req.body.existingImages);
    }

    if(req.files && req.files.length > 0){

      const uploads = await Promise.all(
        req.files.map(async(file)=>{
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );

      images = [...images, ...uploads];
    }

    property.images = images;

    await property.save();
    res.json({success:true, message:"Property updated successfully"});
  }
  catch(error){
    res.json({success:false,message:error.message });
  }
};


//3.list
const listProperties = async (req, res) => {
  const properties = await propertyModel.find({
    ownerId: req.userId,
  });

  res.json({ success: true, properties });
};



const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel
      .find()
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, properties });
  } 
  catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const getAllCities = async (req, res) => {
  try {
    const cities = await propertyModel.distinct("location.city");
    res.json({ success: true, cities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeProperty = async (req, res) => {
  const property = await propertyModel.findOne({
    _id: req.body.propertyId,
    ownerId: req.userId,
  });

  if (!property) {
    return res.json({ success: false, message: "Unauthorized" });
  }

  await property.deleteOne();

  res.json({ success: true, message: "Property removed" });
};



export { addProperty,listProperties,updateProperty,removeProperty,getAllProperties,getAllCities };