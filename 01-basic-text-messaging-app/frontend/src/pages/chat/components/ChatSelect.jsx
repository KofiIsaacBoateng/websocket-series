import React from "react";
import Image from "../../../components/Image";
import { useChatContext } from "../context/ChatContext";

function ChatSelect({ chat }) {
  const { selectedChat, updateSelectedChat } = useChatContext();
  return (
    <div
      className={`chat-list-chats-chat ${
        chat.id === selectedChat?.id && "chat-list-chats-chat-active"
      }`}
      onClick={() => updateSelectedChat(chat)}
    >
      <Image
        src={chat.profile}
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
        status={chat.onlineStatus}
      />
      <div className="chat-list-chats-chat-overview">
        <h5 className="chat-list-chats-chat-overview-name">{chat.name}</h5>
        <p className="chat-list-chats-chat-overview-recent">
          {chat.recentMessage}
        </p>
      </div>
      <div className="chat-list-chats-chat-details">
        <div className="chat-list-chats-chat-details-time">
          {chat.recentMessageTime}
        </div>
        {chat.numberOfNewMessages && chat.numberOfNewMessages > 0 ? (
          <div className="chat-list-chats-chat-details-badge">
            {chat.numberOfNewMessages}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ChatSelect;
