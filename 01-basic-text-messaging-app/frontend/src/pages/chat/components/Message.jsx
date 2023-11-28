import React, { useEffect, useRef } from "react";
import Image from "../../../components/Image";
import { useUserContext } from "../../../context/UserContext";
import { useChatContext } from "../context/ChatContext";

function Message({ message }) {
  const { user } = useUserContext();
  const { selectedChat } = useChatContext();
  const messageRef = useRef(null);
  const date = new Date(message.createdAt);
  const timestamp = `${date.getHours()} : ${date.getMinutes()}`;

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);
  return (
    <div
      ref={messageRef}
      className={`message ${
        message.sender._id === user._id ? "sender" : "receiver"
      }`}
    >
      {/**** photo */}
      <Image
        src={
          message.sender._id === user._id
            ? user.profile
            : selectedChat.users.profile
        }
        style={{
          width: 30,
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
        <p className="message-timestamp">{timestamp}</p>
      </div>
    </div>
  );
}

export default Message;
