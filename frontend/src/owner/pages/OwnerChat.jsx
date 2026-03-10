import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { DataContext } from "../../context/DataContext";

const OwnerChat = () => {

  const { backendUrl, token } = useContext(DataContext);

  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  useEffect(() => {
    const newSocket = io(backendUrl);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [backendUrl]);

  const fetchChats = async () => {
    const res = await axios.get(
      backendUrl + "/api/chat/my-chats",
      { headers: { token } }
    );

    setChats(res.data.chats);
  };

  const fetchMessages = async (chatId) => {
    const res = await axios.get(
      backendUrl + "/api/chat/messages/" + chatId,
      { headers: { token } }
    );

    setMessages(res.data.messages);

    if (socket) {
      socket.emit("joinChat", chatId);
    }
  };

  useEffect(() => {

    fetchChats();

    if (socket && userId) {
      socket.emit("userOnline", userId);

      socket.on("receiveMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => socket.off("receiveMessage");
    }

  }, [socket]);

  const sendMessage = async () => {

    if (!text.trim()) return;

    const res = await axios.post(
      backendUrl + "/api/chat/send",
      { chatId: currentChat._id, text },
      { headers: { token } }
    );

    socket.emit("sendMessage", {
      chatId: currentChat._id,
      message: res.data.msg
    });

    setMessages((prev) => [...prev, res.data.msg]);
    setText("");
  };

  return (
    <div className="flex h-[75vh] bg-[#111b21] text-white rounded-xl overflow-hidden">

      <div className="w-[30%] bg-[#202c33] overflow-y-auto">

        <div className="p-4 font-bold text-lg">Chats</div>

        {chats.map((chat) => {

          const otherUser = chat.participants.find(
            (p) => p._id !== userId
          );

          return (
            <div
              key={chat._id}
              className="p-4 cursor-pointer hover:bg-[#2a3942]"
              onClick={() => {
                setCurrentChat(chat);
                fetchMessages(chat._id);
              }}
            >
              <p className="font-semibold">{otherUser?.name}</p>

              <p className="text-sm text-gray-400">
                {chat.lastMessage || "No messages yet"}
              </p>

            </div>
          );

        })}

      </div>

      <div className="flex-1 flex flex-col">

        {currentChat ? (
          <>

            <div className="p-4 bg-[#202c33] border-b border-gray-700">

              <h2 className="font-semibold">

                {
                  currentChat.participants.find(
                    (p) => p._id !== userId
                  )?.name
                }

              </h2>

            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-[#0b141a]">

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
                    className={`px-4 py-2 rounded-lg max-w-xs ${
                      msg.senderId === userId
                        ? "bg-[#005c4b]"
                        : "bg-[#202c33]"
                    }`}
                  >
                    {msg.text}
                  </div>

                </div>

              ))}

            </div>

            <div className="p-3 bg-[#202c33] flex gap-2">

              <input
                className="flex-1 p-2 rounded bg-[#2a3942]"
                value={text}
                placeholder="Type a message"
                onChange={(e) => setText(e.target.value)}
              />

              <button
                onClick={sendMessage}
                className="bg-green-600 px-4 rounded"
              >
                Send
              </button>

            </div>

          </>
        ) : (

          <div className="flex items-center justify-center flex-1">
            Select a chat
          </div>

        )}

      </div>

    </div>
  );
};

export default OwnerChat;