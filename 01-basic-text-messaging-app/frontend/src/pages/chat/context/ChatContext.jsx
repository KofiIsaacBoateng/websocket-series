import React, { createContext, useContext, useEffect, useState } from "react";

const Chat = createContext();

function ChatContext({ children }) {
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [conversations, setConverse] = useState([]);

  useEffect(() => {
    setSelectedChat(undefined);
  }, []);

  useEffect(() => {
    console.log("update running");
    if (conversations.length === 0) return;

    setConverse((prev) =>
      prev.sort((a, b) => b.recent.createdAt - a.recent.createdAt)
    );
  }, [messages, conversations]);

  const updateSelectedChat = (chat) => {
    setSelectedChat((prev) => chat);
  };

  const updateMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateConversationsOnMessageSent = (chat) => {
    const notChat = conversations.filter((con) => con._id !== chat._id);
    setConverse((prev) => [chat, ...notChat]);
    setSelectedChat(chat);
  };

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
        updateConversationsOnMessageSent,
      }}
    >
      {children}
    </Chat.Provider>
  );
}

export const useChatContext = () => useContext(Chat);

export default ChatContext;
