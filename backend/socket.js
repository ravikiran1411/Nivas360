import {Server} from "socket.io";

const initSocket = (server)=>{
  const io = new Server(server,{
    cors:{
      origin: "*",
    }
  });

  // 1.Store online users
  const onlineUsers = new Map();

  io.on("connection", (socket)=>{
    console.log("User connected:", socket.id);

    // 2.When user comes online
    socket.on("userOnline", (userId)=>{
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    // 3.Join a specific chat room
    socket.on("joinChat", (chatId)=>{
      socket.join(chatId);
    });

    // 4.Send message (real-time chat)
    socket.on("sendMessage", ({chatId,message})=>{
      socket.to(chatId).emit("receiveMessage", message);
    });

    // 5.when User disconnects
    socket.on("disconnect", ()=>{
      for (let [userId, socketId] of onlineUsers.entries()) { 
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("User disconnected:", socket.id);
    });
  });
};

export default initSocket;
