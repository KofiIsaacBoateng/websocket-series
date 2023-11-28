import React from "react";
import Image from "../../../components/Image";
import { useChatContext } from "../context/ChatContext";
import useSelectedChats from "../../../hooks/useSelectedChats";

function ChatSelect({ conversation }) {
  const { selectedChat } = useChatContext();
  const { getChat } = useSelectedChats();
  return (
    <div
      className={`chat-list-chats-chat ${
        conversation.id === selectedChat?._id && "chat-list-chats-chat-active"
      }`}
      onClick={() => getChat(conversation.users._id)}
    >
      <Image
        src={conversation.users.profile}
        style={{
          aspectRatio: 1,
          borderRadius: 100,
          width: "18%",
        }}
        imageStyle={{
          width: "100%",
          aspectRatio: 1,
          objectFit: "cover",
          borderRadius: 50,
        }}
        status={false}
      />
      <div className="chat-list-chats-chat-overview">
        <h5 className="chat-list-chats-chat-overview-name">
          {conversation.users.name}
        </h5>
        <p className="chat-list-chats-chat-overview-recent">
          Recent Message {/*** to be updated */}
        </p>
      </div>
      <div className="chat-list-chats-chat-details">
        <div className="chat-list-chats-chat-details-time">05:13</div>
        {/* {chat.numberOfNewMessages && chat.numberOfNewMessages > 0 ? (
          <div className="chat-list-chats-chat-details-badge">
            {chat.numberOfNewMessages}
          </div>
        ) : (
          <></> */}
        {/* )} */}
      </div>
    </div>
  );
}

export default ChatSelect;
