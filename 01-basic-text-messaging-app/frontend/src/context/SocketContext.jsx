import React, { useState, useContext, createContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useUserContext } from "./UserContext";

const Context = createContext();

function SocketContext({ children }) {
  const [socket, setSocket] = useState(undefined);
  const [onlineUsers, setOnlineUsers] = useState({});
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      const socket = io("http://192.168.43.14:3500");
      setSocket(socket);

      socket?.on("connect", () => {
        console.log("frontend connected");
        socket.emit("is-online", user._id);
      });

      socket.on("online", (users) => setOnlineUsers(users));

      return () => {
        socket?.off("online");
        socket.close();
      };
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
        onlineUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useSocket = () => useContext(Context);

export default SocketContext;
