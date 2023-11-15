import React, { useState } from "react";
import ChatSelect from "./ChatSelect";
import chats from "../helper/propChat";

/*** ICONS */
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi"; // theme
import { CiSearch } from "react-icons/ci"; // search
import { FaRegPenToSquare } from "react-icons/fa6"; // add chat
import { IoFilter } from "react-icons/io5";

function ChatList() {
  const [search, setSearch] = useState("");
  return (
    <div className="chat-list">
      {/**** header */}
      <div className="chat-list-header">
        {/**** title */}
        <div className="chat-list-header-heading">
          <h4 className="chat-list-header-heading-title">Chats</h4>
          <div className="chat-list-header-right-controls">
            <div className="chat-list-header-right-controls-control">
              <FaRegPenToSquare size={15} color="#fffa" />
            </div>
            <div className="chat-list-header-right-controls-control">
              <IoFilter size={15} color="#fffa" />
            </div>
            <div className="chat-list-header-right-controls-control">
              <FiSun size={15} color="#fffa" />
            </div>
          </div>
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
