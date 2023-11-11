import React from "react";
import Image from "../../../components/Image";

function ChatSelect({ chat, activeChat, setActiveChat }) {
  return (
    <div
      className={`chat-list-chats-chat ${
        chat.id === activeChat.id && "chat-list-chats-chat-active"
      }`}
      onClick={() => setActiveChat(chat)}
    >
      <Image
        src={`https://avatar.iran.liara.run/public/${chat.gender}/?username=${chat.name}`}
        style={{
          width: "18%",
          aspectRatio: 1,
          borderRadius: 100,
          objectFit: "cover",
        }}
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
