import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ChatContext from "./pages/chat/context/ChatContext.jsx";
import UserContext from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext>
        <ChatContext>
          <App />
        </ChatContext>
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>
);
