import React, { useState } from "react";
import axios from "axios";
import { useChatContext } from "../pages/chat/context/ChatContext";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";

function useSelectedChats() {
  const { setMessages, updateSelectedChat } = useChatContext();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  const getChat = async (receiverId) => {
    setLoading((prev) => true);
    try {
      const {
        data: {
          success,
          data: { chat, messages },
        },
      } = await axios.get(`/api/v1/message/${receiverId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log(chat);

      if (success) {
        setMessages((prev) => messages);
        updateSelectedChat(chat);
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
  return [loading, getChat];
}

export default useSelectedChats;
