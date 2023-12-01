import React, { useState, useContext, createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "./UserContext";

const Context = createContext();

function SocketContext({ children }) {
  const [socket, setSocket] = useState(undefined);
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:3500");
      setSocket(socket);

      socket?.on("connect", () => {
        console.log("frontend connected");
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <Context.Provider
      value={{
        socket,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useSocket = () => useContext(Context);

export default SocketContext;
