import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ChatContext from "./pages/chat/context/ChatContext.jsx";
import UserContext from "./context/UserContext.jsx";
import SocketContext from "./context/SocketContext.jsx";

// icons
import { FaTimesCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { BsInfoCircleFill } from "react-icons/bs";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <ChatContext>
          <SocketContext>
            <App />
            <Toaster
              position="top-center"
              toastOptions={{
                success: {
                  duration: 3000,
                  icon: <FaCircleCheck size={15} color="#fff" />,
                  style: {
                    backgroundColor: "green",
                    color: "#fff",
                  },
                },

                error: {
                  duration: 3000,
                  icon: <FaTimesCircle size={18} color="#fff" />,
                  style: {
                    backgroundColor: "firebrick",
                    color: "#fff",
                  },
                },

                duration: 3000,
                icon: <BsInfoCircleFill size={18} color="#fff" />,
                style: {
                  backgroundColor: "#131542",
                  color: "#fff",
                },
              }}
            />
          </SocketContext>
        </ChatContext>
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>
);
