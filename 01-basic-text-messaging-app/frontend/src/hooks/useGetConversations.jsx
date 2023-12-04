import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useChatContext } from "../pages/chat/context/ChatContext";

function useGetConversations() {
  const [loading, setLoading] = useState();
  const { setConverse } = useChatContext();
  const { user } = useUserContext();

  const getOneConversation = async (message) => {
    try {
      const {
        data: { success, data },
      } = await axios.get(
        `/api/v1/message/chat/conversation/${message.chatId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (success) {
        console.log("data from conversation: data");
        return data;
      }
    } catch (error) {
      console.log("error: ", error);
    }
    // catch ({
    //   response: {
    //     data: { message },
    //   },
    // }) {
    //   toast.error(message || "Something went wrong.");
    // }
  };

  const getConversations = async () => {
    setLoading(true);
    try {
      const {
        data: { data, success },
      } = await axios.get("/api/v1/message/chat/conversation", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (success) {
        const filteredData = data
          .map((item) => {
            const receiver = item.users.filter(
              (person) => person._id !== user._id
            )[0];
            return {
              ...item,
              users: receiver,
            };
          })
          .filter((item) => item.users !== undefined)
          .filter((item) => item.recent !== undefined);
        setConverse((prev) => [...filteredData]);
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(message || "Something went wrong.");
    }

    setLoading(false);
  };

  return { loading, getConversations, getOneConversation };
}

export default useGetConversations;
