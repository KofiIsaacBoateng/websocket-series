import React, { createContext, useContext, useEffect, useState } from "react";
import initialMessages from "../helper/messages";

const Chat = createContext();

function ChatContext({ children }) {
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [messages, setMessages] = useState([...initialMessages]);

  const updateSelectedChat = (chat) => {
    setSelectedChat((prev) => chat);
  };

  const updateMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    setSelectedChat(undefined);
  }, []);

  return (
    <Chat.Provider
      value={{ selectedChat, updateSelectedChat, messages, updateMessages }}
    >
      {children}
    </Chat.Provider>
  );
}

export const useChatContext = () => useContext(Chat);

export default ChatContext;
