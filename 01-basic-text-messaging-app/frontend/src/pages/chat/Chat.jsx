import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import Conversation from "./components/Conversation";

// css
import "./styles/chats.styles.css";
import "./styles/conversation.styles.css";

// temporaries
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/lottie-04.json";
import { useChatContext } from "./context/ChatContext";

function Chat() {
  const { selectedChat } = useChatContext();
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
          {!selectedChat ? (
            <>
              <Lottie
                style={{ height: "50%" }}
                options={defaultLottieOptions}
              />
              <h2 className="conversation-messages-lottie-message">
                Select a chat to start a conversation.
              </h2>
            </>
          ) : (
            <Conversation />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
