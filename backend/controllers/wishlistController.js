import userModel from "../models/userModel.js";

const addToWishlist = async (req,res)=>{
  try {
    const {propertyId} = req.body;
    await userModel.findByIdAndUpdate(req.userId, {$addToSet:{wishlist:propertyId}});
    res.json({success:true, message:"Added to wishlist"});
  } 
  catch (error) {
    res.json({success:false, message:error.message});
  }
};

const removeFromWishlist = async (req,res)=>{
  try {
    const {propertyId} = req.body;
    await userModel.findByIdAndUpdate(req.userId, {$pull: {wishlist:propertyId}});
    res.json({ success: true, message: "Removed from wishlist" });
  } 
  catch (error){
    res.json({success:false, message:error.message});
  }
};

const getWishlist = async (req,res)=>{
  const user = await userModel.findById(req.userId).populate("wishlist");
  res.json({success:true, wishlist:user.wishlist});
};

export {addToWishlist, removeFromWishlist, getWishlist};