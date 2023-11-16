import React from "react";
import { useChatContext } from "../context/ChatContext";
import Message from "./Message";

function MainChat() {
  const { messages } = useChatContext();
  return (
    <div className="message-panel-main-chat">
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </div>
  );
}

export default MainChat;
