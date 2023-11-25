import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useChatContext } from "../pages/chat/context/ChatContext";
import { toast } from "react-hot-toast";
import axios from "axios";

function useSendMessage() {
  const { user } = useUserContext();
  const { selectedChat, updateMessages } = useChatContext();
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    const receiver = selectedChat.users.find((person) => person !== user._id);
    const chatId = selectedChat._id;
    try {
      const {
        data: { success, data },
      } = await axios.post(
        "/api/v1/message",
        { message, receiver, chatId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (success) {
        updateMessages(data);
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(message);
    }

    setLoading(false);
  };
  return [loading, sendMessage];
}

export default useSendMessage;
