import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useChatContext } from "../pages/chat/context/ChatContext";
import { useSocket } from "../context/SocketContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import sent from "../assets/audio/sent.mp3";

function useSendMessage() {
  const { user } = useUserContext();
  const { socket } = useSocket();
  const {
    selectedChat,
    updateSelectedChat,
    updateMessages,
    updateConversationsOnMessageSent,
  } = useChatContext();
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
        const audio = new Audio(sent);
        audio.play(); // play audio
        updateMessages(data); // update message list

        /*** update recent messages on chat list */
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

        if (upSuccess) {
          const chatUser = upData.users.filter(
            (person) => person._id !== user._id
          )[0];
          updateConversationsOnMessageSent({ ...upData, users: chatUser });
          updateSelectedChat({ ...upData, users: chatUser });
        }

        /**** send message in real time */
        socket.emit("new message", data);
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(message || "Something went wrong!");
    }

    // catch (error) {
    //   console.log(error);
    // }

    setLoading(false);
  };
  return { loading, sendMessage };
}

export default useSendMessage;
