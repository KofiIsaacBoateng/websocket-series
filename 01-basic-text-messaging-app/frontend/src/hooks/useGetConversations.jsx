import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useChatContext } from "../pages/chat/context/ChatContext";

function useGetConversations() {
  const [loading, setLoading] = useState();
  const { setConverse } = useChatContext();

  const getConversations = async (user) => {
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
          .filter((item) => item.users !== undefined);
        setConverse((prev) => [...filteredData]);
      }
    } catch (error) {
      toast.error(message);
    }

    setLoading(false);
  };

  return { loading, getConversations };
}

export default useGetConversations;
