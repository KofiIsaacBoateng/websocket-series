import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useChatContext } from "../pages/chat/context/ChatContext";
import { toast } from "react-hot-toast";
import axios from "axios";

function useSendMessage() {
  const { user } = useUserContext();
  const { selectedChat, updateMessages, updateConversationsOnMessageSent } =
    useChatContext();
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    const receiver = selectedChat.users;
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
        /*** update recent messages on chat */
        const {
          data: { success: upSuccess, data: upData },
        } = await axios.patch(
          `/api/v1/message/recent/${data.chatId}`,
          {
            messageId: data._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const receiver = upData.users.filter(
          (person) => person._id !== user._id
        )[0];
        if (upSuccess) {
          updateConversationsOnMessageSent({ ...upData, users: receiver });
        }
      }
    } catch (error) {
      console.log(error);
    }
    // catch ({
    //   response: {
    //     data: { message },
    //   },
    // }) {
    //   toast.error(message);
    // }

    setLoading(false);
  };
  return { loading, sendMessage };
}

export default useSendMessage;
