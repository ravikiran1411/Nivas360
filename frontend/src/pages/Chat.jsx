import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { assets } from "../assets/assets";

const Chat = () => {
  const { backendUrl } = useContext(DataContext);

  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const chatIdFromUrl = query.get("chatId");

  useEffect(() => {
    if (!backendUrl) return;
    const newSocket = io(backendUrl);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [backendUrl]);

  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(backendUrl + "/api/chat/messages/" + chatId,{headers:{token}});

      if (res.data.success) {
        setMessages(res.data.messages);
        socket?.emit("joinChat", chatId);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token || !socket) return;

    const loadChats = async () => {
      try {
        const res = await axios.get(backendUrl + "/api/chat/my-chats",{headers:{token}});

        if (res.data.success) {
          setChats(res.data.chats);

          if (chatIdFromUrl) {
            const selectedChat = res.data.chats.find((c) => c._id === chatIdFromUrl);

            if (selectedChat) {
              setCurrentChat(selectedChat);
              fetchMessages(selectedChat._id);
            }
          }
        }
      } 
      catch (error) {
        console.log(error);
      }
    };

    loadChats();

    if (userId) {
      socket.emit("userOnline", userId);
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [socket, chatIdFromUrl]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !currentChat) return;

    try {
      const res = await axios.post(backendUrl + "/api/chat/send",{ chatId: currentChat._id, text },{headers:{token}});

      if (res.data.success) {
        socket.emit("sendMessage", {
          chatId: currentChat._id,
          message: res.data.msg,
        });

        setMessages((prev) => [...prev, res.data.msg]);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-[80vh] bg-[#f8fafc] rounded-2xl overflow-hidden shadow-xl">
      <div className="w-full sm:w-[30%] bg-[#2563eb] text-white overflow-y-auto">
        <div className="p-4 font-bold text-lg border-b border-blue-400">
          Chats
        </div>

        {chats.map((chat) => {
          const otherUser = chat.participants.find(
            (p) => p._id !== userId
          );

          return (
            <div
              key={chat._id}
              className="p-4 cursor-pointer hover:bg-[#3b82f6] transition flex items-center gap-3"
              onClick={() => {
                setCurrentChat(chat);
                fetchMessages(chat._id);
              }}
            >
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />

              <div>
                <p className="font-semibold">{otherUser?.name}</p>
                <p className="text-sm text-blue-100">
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div className="p-4 bg-[#2563eb] text-white border-b flex items-center gap-3">
              <img
                src={assets.profile_icon}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />

              <h2 className="font-semibold">
                {
                  currentChat.participants.find(
                    (p) => p._id !== userId
                  )?.name
                }
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-[#f1f5f9]">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`mb-3 flex ${
                    msg.senderId === userId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-xs shadow-md ${
                      msg.senderId === userId
                        ? "bg-[#22c55e] text-white"
                        : "bg-white text-gray-800 border"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              <div ref={bottomRef}></div>
            </div>

            <div className="p-3 bg-white border-t flex gap-2">
              <input
                className="flex-1 p-3 rounded-full bg-gray-100 border border-gray-300 text-gray-800 outline-none"
                value={text}
                placeholder="Type a message"
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />

              <button
                onClick={sendMessage}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] p-3 rounded-full shadow-md transition"
              >
                <img
                  src={assets.send_button}
                  alt="send"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500 text-lg">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;