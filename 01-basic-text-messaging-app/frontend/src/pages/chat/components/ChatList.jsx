import React, { useState } from "react";

/*** ICONS */
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import ChatSelect from "./ChatSelect";
import chats from "../helper/propChat";

function ChatList() {
  const [search, setSearch] = useState("");
  return (
    <div className="chat-list">
      {/**** header */}
      <div className="chat-list-header">
        {/**** title */}
        <div className="chat-list-header-heading">
          <h4 className="chat-list-header-heading-title">Chats</h4>
          <FiSun size={15} color="#fffa" />
        </div>
        {/*** search */}
        <div className="chat-list-header-search">
          <input
            type="text"
            name="search"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="chat-list-header-search-search-input"
          />
          <CiSearch size={18} color="#0c0d34" />
        </div>
      </div>
      {/*** chat lists */}
      <div className={`chat-list-chats `}>
        {chats.map((item, index) => (
          <ChatSelect key={index} chat={item} />
        ))}
      </div>
    </div>
  );
}

export default ChatList;
