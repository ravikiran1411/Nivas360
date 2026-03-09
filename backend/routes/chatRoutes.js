import express from "express";
import userAuth from "../middleware/userAuth.js";
import {startChat,sendMessage,clearChat,getUserChats,getMessages} from "../controllers/chatController.js";

const router = express.Router();

router.post("/start", userAuth, startChat);
router.post("/send", userAuth, sendMessage);
router.post("/clear", userAuth, clearChat);
router.get("/my-chats", userAuth, getUserChats);
router.get("/messages/:chatId", userAuth, getMessages);


export default router;
