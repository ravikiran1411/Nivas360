import userModel from "../models/userModel.js";

const ownerAuth = async (req, res, next) => {
  const user = await userModel.findById(req.userId);

  if (!user || user.role !== "owner") {
    return res.json({ success: false, message: "Owner access only" });
  }

  next();
};

export default ownerAuth;