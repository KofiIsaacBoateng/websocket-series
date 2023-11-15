import React, { createContext, useContext, useEffect, useState } from "react";

const Chat = createContext();

function ChatContext({ children }) {
  const [selectedChat, setSelectedChat] = useState(undefined);

  const updateSelectedChat = (chat) => {
    setSelectedChat((prev) => chat);
  };

  useEffect(() => {
    setSelectedChat(undefined);
  }, []);

  return (
    <Chat.Provider value={{ selectedChat, updateSelectedChat }}>
      {children}
    </Chat.Provider>
  );
}

export const useChatContext = () => useContext(Chat);

export default ChatContext;
