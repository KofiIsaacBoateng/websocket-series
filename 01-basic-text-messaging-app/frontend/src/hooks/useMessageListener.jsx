import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useChatContext } from "../pages/chat/context/ChatContext";
import incomingSound from "../assets/audio/incoming.mp3";

function useMessageListener() {
  const { socket } = useSocket();
  const {
    updateMessages,
    selectedChat,
    unreadMessages,
    setUnreadMessages,
    updateConversationsOnMessageSent,
    conversations,
  } = useChatContext();

  const useListener = () => {
    useEffect(() => {
      socket?.on("incoming", (message) => {
        console.log(selectedChat);
        if (selectedChat?._id === message.chatId) {
          updateMessages(message);
          const audio = new Audio(incomingSound); // play new message sound
          audio.play();
        } else {
          //   setUnreadMessages((prev) => {
          //     if (!unreadMessages[message.sender._id]) {
          //       unreadMessages[message.sender._id] = [message];
          //     } else {
          //       unreadMessages[message.sender._id].push(message);
          //     }
          //   });
        }

        // update conversations recent
        let chat = conversations.filter((con) => con._id === message.chatId)[0];
        console.log("message", message);
        console.log("conversations", conversations);
        chat.recent = message;
        updateConversationsOnMessageSent(chat);
      });

      return () => socket?.off("incoming");
    }, [socket]);
  };

  return { useListener };
}

export default useMessageListener;
