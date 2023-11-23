import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUserContext } from "../context/UserContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUserContext();

  const signup = async (data) => {
    setLoading((prev) => true);
    try {
      const {
        data: { success, data: resData, token },
      } = await axios.post("/api/v1/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (success) {
        updateUser({ ...resData, token });
        toast.success("Signed up successfully. Enjoy!");
      }
    } catch ({
      response: {
        data: { message },
      },
    }) {
      toast.error(message);
    }
    setLoading((prev) => false);
  };

  const usernameExists = async (username) => {
    const {
      data: { success, exists },
    } = await axios.post(
      "/api/v1/auth/exists",
      { username },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (success) {
      return exists;
    }
  };

  return [loading, signup, usernameExists];
}

export default useSignup;
