import React, { useEffect, useRef, useState } from "react";
import Image from "../../../components/Image";
import useGetUsers from "../../../hooks/useGetUsers";

// css
import "../styles/new-chat-modal.styles.css";
import useSelectedChats from "../../../hooks/useSelectedChats";
import { useChatContext } from "../context/ChatContext";

function NewChatModal({ setOpenNewChatModal }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { loading: usersLoading, fetchUsers } = useGetUsers();
  const { loading: chatLoading, getChat } = useSelectedChats();
  const { setConversationOther } = useChatContext();
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current?.focus(); ==> set focus based on render change factor
    fetchUsers(setUsers);
  }, []);

  const updateConversation = (user) => {
    getChat(user._id);
    setConversationOther(user);
    setOpenNewChatModal(false);
  };

  return (
    <div className="add-chat">
      {/*** heading */}
      <h3 className="add-chat-heading">New chat</h3>

      {/*** search  */}
      <div className="add-chat-search">
        <input
          ref={inputRef}
          type="text"
          name="search-new-chat"
          placeholder="search name or username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/*** users */}
      <div className="add-chat-users">
        {users.map((user) => (
          <div
            onClick={() => updateConversation(user)}
            className="add-chat-users-list"
          >
            {/**** photo */}
            <Image
              style={{ width: "15%", aspectRatio: 1 }}
              imageStyle={{
                width: "100%",
                aspectRatio: 1,
                objectFit: "cover",
                borderRadius: 100,
              }}
              src={user.profile}
            />
            <div className="add-chat-users-list-details">
              <h4 className="add-chat-users-list-details-name">{user.name}</h4>
              <h5 className="add-chat-users-list-details-username">
                @ {user.username}
              </h5>
            </div>
            <p className="add-chat-users-list-status">offline</p>
            {/*** name */}

            {/**** online status */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewChatModal;
