import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";

// 1.Start chat
const startChat = async (req, res) => {
  try {
    const { ownerId } = req.body;
    const userId = req.userId;

    if (ownerId === userId) {
      return res.json({success: false,message: "Cannot chat with yourself"});
    }

    // Check if chat already exists
    const existingChat = await chatModel.findOne({
      participants: { $all: [userId, ownerId] }
    });

    if (existingChat) {
      return res.json({success: true,chat: existingChat});
    }

    // Create new chat
    const newChat = await chatModel.create({
      participants: [userId, ownerId]
    });

    res.json({success: true,chat: newChat });
  } 
  catch (error) {
    res.json({ success: false, message: error.message});
  }
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
