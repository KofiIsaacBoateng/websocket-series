import React, { createContext, useContext, useEffect, useState } from "react";

const Chat = createContext();

function ChatContext({ children }) {
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [conversations, setConverse] = useState([]);

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
      value={{
        selectedChat,
        updateSelectedChat,
        messages,
        updateMessages,
        setMessages,
        conversations,
        setConverse,
      }}
    >
      {children}
    </Chat.Provider>
  );
}

export const useChatContext = () => useContext(Chat);

export default ChatContext;
