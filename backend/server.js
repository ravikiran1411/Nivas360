import express from "express";
import cors from "cors";
import http from "http";

import connectDB from "./config/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";
import initSocket from "./socket.js";

import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

initSocket(server);

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});