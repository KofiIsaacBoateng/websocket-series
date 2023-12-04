import React, { createContext, useContext, useEffect, useState } from "react";

const Chat = createContext();

function ChatContext({ children }) {
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [conversations, setConverse] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  useEffect(() => {
    setSelectedChat(undefined);
  }, []);

  useEffect(() => {
    if (conversations.length === 0) return;

    setConverse((prev) =>
      prev.sort((a, b) => b.recent.createdAt - a.recent.createdAt)
    );
  }, [messages, conversations, unreadMessages]);

  const updateSelectedChat = (chat) => {
    setSelectedChat((prev) => chat);
  };

  const updateUnreadMessages = (message) => {
    setUnreadMessages((prev) => {
      const senderId = message.sender._id;
      if (prev) {
        if (prev[senderId] !== undefined) {
          prev[senderId].push(message);
        } else {
          prev[senderId] = [message];
        }
      } else {
        return {
          [senderId]: [message],
        };
      }

      return prev;
    });
  };

  const updateMessages = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateConversationsOnMessageSent = (chat) => {
    const notChat = conversations.filter((con) => con._id !== chat._id);
    setConverse((prev) => [chat, ...notChat]);
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
        updateUnreadMessages,
        unreadMessages,
        setUnreadMessages,
      }}
    >
      {children}
    </Chat.Provider>
  );
}

export const useChatContext = () => useContext(Chat);

export default ChatContext;
