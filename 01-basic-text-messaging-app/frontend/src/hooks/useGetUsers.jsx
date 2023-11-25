import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";

function useGetUsers() {
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();

  const fetchUsers = async (setter) => {
    setLoading(true);
    try {
      const {
        data: { success, data },
      } = await axios.get("/api/v1/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (success) {
        setter(data);
      }
    } catch (error) {
      toast.error("Couldn't fetch users! Please try again.");
    }
  };
  return { loading, fetchUsers };
}

export default useGetUsers;
