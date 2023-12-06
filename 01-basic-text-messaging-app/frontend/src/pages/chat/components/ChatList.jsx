import React, { useEffect, useState } from "react";
import ChatSelect from "./ChatSelect";
import NewChatModal from "./NewChatModal";

/*** ICONS */
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi"; // theme
import { CiSearch } from "react-icons/ci"; // search
import { FaRegPenToSquare } from "react-icons/fa6"; // add chat
import { IoFilter } from "react-icons/io5";
import { useChatContext } from "../context/ChatContext";
import { useUserContext } from "../../../context/UserContext";
import useGetConversations from "../../../hooks/useGetConversations";

function ChatList() {
  const [search, setSearch] = useState("");
  const [openNewChatModal, setOpenNewChatModal] = useState(false);
  const { conversations } = useChatContext();
  const { user } = useUserContext();
  const { getConversations } = useGetConversations();

  useEffect(() => {
    if (user._id) {
      getConversations();
    }
  }, [user]);

  return (
    <div className="chat-list">
      {openNewChatModal && (
        <div
          onClick={() => setOpenNewChatModal(false)}
          className="add-chat-close"
        />
      )}
      {/**** header */}
      <div className="chat-list-header">
        {/**** title */}
        <div className="chat-list-header-heading">
          <h4 className="chat-list-header-heading-title">Chats</h4>
          <div className="chat-list-header-right-controls">
            <div
              onClick={() => setOpenNewChatModal(true)}
              className="chat-list-header-right-controls-control"
            >
              <FaRegPenToSquare size={15} color="#fffa" />
            </div>
            <div className="chat-list-header-right-controls-control">
              <IoFilter size={15} color="#fffa" />
            </div>
            <div className="chat-list-header-right-controls-control">
              <FiSun size={15} color="#fffa" />
            </div>
            {openNewChatModal && (
              <NewChatModal setOpenNewChatModal={setOpenNewChatModal} />
            )}
          </div>
        </div>
        {/*** search */}
        <div className="chat-list-header-search">
          <input
            type="text"
            name="search"
            placeholder="search chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="chat-list-header-search-search-input"
          />
          <CiSearch size={18} color="#fff" />
        </div>
      </div>
      {/*** chat lists */}
      <div className={`chat-list-chats `}>
        {conversations.map((item, index) => (
          <ChatSelect key={index} conversation={item} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
