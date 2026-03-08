import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.json({ success: false, message: "Admin only" });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: "Admin authorization failed" });
  }
};

export default adminAuth;
