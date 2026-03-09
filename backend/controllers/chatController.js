import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";

// 1.Start chat
const startChat = async (req,res)=>{
  const {ownerId} = req.body;

  let chat = await chatModel.findOne({participants:{$all:[req.userId,ownerId]}});

  if (!chat) {
    chat = await chatModel.create({participants:[req.userId,ownerId]});
  }

  res.json({success:true,chat});
};

// 2.Send message
const sendMessage = async (req,res)=>{
  const {chatId,text} = req.body;

  const msg = await messageModel.create({chatId, senderId: req.userId, text});

  // update last message
  await chatModel.findByIdAndUpdate(chatId, {lastMessage: text});

  res.json({success:true,msg});
};

// 3.Clear chat
const clearChat = async (req,res)=>{
  await messageModel.deleteMany({chatId:req.body.chatId});

  res.json({success:true, message:"Chat cleared"});
};

// 4.Get all chats of logged in user
const getUserChats = async (req, res) => {
  const chats = await chatModel
    .find({participants:req.userId})
    .populate("participants", "name email")
    .sort({updatedAt:-1});

  res.json({success:true, chats});
};

// 5.Get messages of chat
const getMessages = async (req,res)=>{
  const messages = await messageModel
    .find({chatId: req.params.chatId})
    .sort({createdAt: 1});

  res.json({success:true, messages});
};

export {startChat,sendMessage,clearChat,getUserChats,getMessages};
