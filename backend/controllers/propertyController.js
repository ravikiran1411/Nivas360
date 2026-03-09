import { v2 as cloudinary } from "cloudinary";
import propertyModel from "../models/propertyModel.js";

const addProperty = async (req, res) => {
  try {
    const images = req.files;

    if (!images || images.length === 0) {
      return res.json({ success: false, message: "Images required" });
    }

    const imageUrls = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url;
      })
    );

    const property = await propertyModel.create({
      ownerId: req.userId,
      title: req.body.title,
      description: req.body.description,
      purpose: req.body.purpose,
      propertyType: req.body.propertyType,
      bhk:
        req.body.propertyType === "plot"
          ? undefined
          : Number(req.body.bhk),
      price: Number(req.body.price),
      SqYards: Number(req.body.SqYards),
      location: {
        city: req.body.city,
        area: req.body.area,
        pincode: Number(req.body.pincode),
      },
      availability: req.body.availability,
      images: imageUrls
    });

    res.json({ success: true, property });

  } 
  catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const listProperties = async (req, res) => {
  const properties = await propertyModel.find({
    ownerId: req.userId,
  });

  res.json({ success: true, properties });
};


const updateProperty = async (req, res) => {
  const { propertyId, price, availability } = req.body;

  const property = await propertyModel.findOne({
    _id: propertyId,
    ownerId: req.userId,
  });

  if (!property) {
    return res.json({ success: false, message: "Unauthorized" });
  }

  if (price !== undefined) {
    property.price = Number(price);
  }

  if (availability !== undefined) {
    property.availability = availability;
  }

  await property.save();

  res.json({ success: true, message: "Property updated" });
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


export { addProperty,listProperties,updateProperty,removeProperty,getAllProperties,getAllCities };