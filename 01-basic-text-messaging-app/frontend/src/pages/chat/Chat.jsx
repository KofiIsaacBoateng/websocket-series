import React, { useState } from "react";
import "./styles/chats.styles.css";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";

// temporaries
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/lottie-04.json";

function Chat() {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };
  return (
    <div className="main">
      {/**** sidebar */}
      <Sidebar />
      {/**** chats display */}
      <ChatList />
      {/**** messages huge box */}
      <div className="conversation">
        <div className="conversation-messages-lottie">
          <Lottie style={{ height: "50%" }} options={defaultLottieOptions} />
          <h2 className="conversation-messages-lottie-message">
            Select a chat to start a conversation.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Chat;
