import React, { useState } from "react";
import axios from "axios";
import { useChatContext } from "../pages/chat/context/ChatContext";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";

function useSelectedChats() {
  const { setMessages, updateSelectedChat, setUnreadMessages, unreadMessages } =
    useChatContext();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  const getChat = async (receiverId) => {
    setLoading((prev) => true);
    try {
      const {
        data: { success, data },
      } = await axios.get(`/api/v1/message/${receiverId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (success) {
        const chatUser = data.users.filter(
          (person) => person._id !== user._id
        )[0];
        setMessages((prev) => data.messages);
        updateSelectedChat({ ...data, users: chatUser, messages: undefined });
        if (unreadMessages && unreadMessages[chatUser._id]) {
          setUnreadMessages((prev) => {
            delete prev[chatUser._id];
            return prev;
          });
        }
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(message);
    }

    setLoading((prev) => true);
  };
  return { loading, getChat };
}

export default useSelectedChats;
