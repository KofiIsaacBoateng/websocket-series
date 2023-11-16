import React, { useEffect, useRef } from "react";
import Image from "../../../components/Image";
import { useChatContext } from "../context/ChatContext";

function Message({ message }) {
  const { selectedChat } = useChatContext();
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);
  return (
    <div
      ref={messageRef}
      className={`message ${
        message.sender === selectedChat.name ? "receiver" : "sender"
      }`}
    >
      {/**** photo */}
      <Image
        src={
          message.sender === selectedChat.name
            ? selectedChat.profile
            : "https://avatar.iran.liara.run/public/boy"
        }
        style={{
          flex: 0.1,
          width: 100,
          aspectRatio: 1,
          borderRadius: 100,
          alignSelf: "flex-end",
        }}
        imageStyle={{
          width: "100%",
          aspectRatio: 1,
          objectFit: "cover",
          borderRadius: 100,
        }}
      />
      {/*** message */}
      <div className="message-text-container">
        <p className="message-text">{message.message}</p>
        <p className="message-timestamp">{message.timestamp}</p>
      </div>
    </div>
  );
}

export default Message;
