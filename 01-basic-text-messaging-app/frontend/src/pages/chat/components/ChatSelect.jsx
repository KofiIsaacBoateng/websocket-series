import React from "react";
import Image from "../../../components/Image";
import { useChatContext } from "../context/ChatContext";
import useSelectedChats from "../../../hooks/useSelectedChats";
import { useSocket } from "../../../context/SocketContext";

function ChatSelect({ conversation }) {
  const { getChat } = useSelectedChats();
  const { onlineUsers } = useSocket();
  const { selectedChat, unreadMessages } = useChatContext();
  const date = new Date(conversation.recent?.createdAt);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timestamp = `${hours < 10 ? "0" : ""}${hours} : ${
    minutes < 10 ? "0" : ""
  }${minutes}`;

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
        status={onlineUsers[conversation.users._id]}
      />
      <div className="chat-list-chats-chat-det">
        <div className="chat-list-chats-chat-overview">
          <h5 className="chat-list-chats-chat-overview-name">
            {conversation.users.name.slice(0, 17)}
            {conversation.users.name.length > 17 ? " ..." : ""}
          </h5>
          <div className="chat-list-chats-chat-details-time">{timestamp}</div>
        </div>
        <div className="chat-list-chats-chat-details">
          <p className="chat-list-chats-chat-overview-recent">
            {conversation.recent.message.slice(0, 22)}
            {conversation.recent.message.length > 22 ? " ..." : ""}
          </p>
          {unreadMessages &&
          unreadMessages[conversation.users._id] &&
          unreadMessages[conversation.users._id].length > 0 ? (
            <div className="chat-list-chats-chat-details-badge">
              {unreadMessages[conversation.users._id].length}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatSelect;
