import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";
import axios from "axios";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { updateUser, user } = useUserContext();
  const login = async (data) => {
    setLoading((prev) => true);
    try {
      const {
        data: { success, data: resData, token },
      } = await axios.post("/api/v1/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (success) {
        updateUser({ ...resData, token });
        toast.success("Logged in successfully. Enjoy!");
        console.log(resData);
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
  return [loading, login];
}

export default useLogin;
