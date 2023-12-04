import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useChatContext } from "../pages/chat/context/ChatContext";
import incomingSound from "../assets/audio/incoming.mp3";
import useGetConversations from "./useGetConversations";
import { useUserContext } from "../context/UserContext";

function useMessageListener() {
  const { socket } = useSocket();
  const { getOneConversation } = useGetConversations();
  const { user } = useUserContext();
  const {
    updateMessages,
    messages,
    selectedChat,
    updateUnreadMessages,
    updateConversationsOnMessageSent,
    conversations,
  } = useChatContext();

  const useListener = () => {
    useEffect(() => {
      socket?.on("incoming", async (message) => {
        if (selectedChat?._id === message.chatId) {
          // update messages and not set as unread
          updateMessages(message);
        } else {
          // update unread messages
          updateUnreadMessages(message);
          // update database as unread
        }

        // update conversations recent
        let chat = conversations.filter((con) => con._id === message.chatId)[0];
        if (!chat) {
          chat = await getOneConversation(message);
          console.log("chat from listener", chat);
          chat.users = chat.users.filter(
            (person) => person._id !== user._id
          )[0];
        } else {
          chat.recent = message;
        }
        updateConversationsOnMessageSent(chat);

        const audio = new Audio(incomingSound); // play new message sound
        audio.play();
      });

      return () => socket?.off("incoming");
    });
  };

  return { useListener };
}

export default useMessageListener;
