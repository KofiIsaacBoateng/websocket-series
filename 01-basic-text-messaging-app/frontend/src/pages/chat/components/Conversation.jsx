import React, { useState } from "react";
import Image from "../../../components/Image";
import Lottie from "react-lottie";
import animationData from "../../../assets/lottie/lottie-08.json";

// icons
import { CiVideoOn } from "react-icons/ci"; // video call
import { IoCallOutline } from "react-icons/io5"; // voice call
import { LiaSearchSolid } from "react-icons/lia"; // search
import { LuSmilePlus } from "react-icons/lu"; // smiley
import { GrFormAttachment } from "react-icons/gr"; // attach
import { GrAttachment } from "react-icons/gr";
import { HiOutlineMicrophone } from "react-icons/hi2"; // microphone
import { VscSend } from "react-icons/vsc"; // send
import { useChatContext } from "../context/ChatContext";
import MainChat from "./MainChat";
import useSendMessage from "../../../hooks/useSendMessage";

function Conversation({ chat }) {
  const [message, setMessage] = useState("");
  const { selectedChat, messages } = useChatContext();
  const [loading, sendMessage] = useSendMessage();

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="message-panel">
      {/*** header */}
      <div className="message-panel-header">
        {/**** left */}
        <div className="message-panel-header-profile">
          {/*** profile image */}
          <Image
            src={chat.profile}
            style={{
              width: 37,
              aspectRatio: 1,
              borderRadius: 100,
              objectFit: "cover",
            }}
            imageStyle={{
              width: "100%",
              aspectRatio: 1,
              objectFit: "cover",
              borderRadius: 50,
            }}
          />
          {/*** name / online status */}
          <div className="message-panel-header-profile-name-online">
            <p className="message-panel-header-profile-name">{chat.name}</p>
            <p
              className={`message-panel-header-profile-online ${
                chat.onlineStatus ? "green" : "gray"
              }`}
            >
              {chat.onlineStatus ? "online" : "offline"}
            </p>
          </div>
        </div>
        {/**** right */}
        <div className="message-panel-header-actions">
          {/**** calls */}
          <div className="message-panel-header-actions-calls">
            <div className="message-panel-header-actions-calls-video">
              <CiVideoOn size={17} color="#fff" />
            </div>
            <div className="separator" />
            <div className="message-panel-header-actions-calls-call">
              <IoCallOutline size={15} color="#fff" />
            </div>
          </div>
          {/**** search */}
          <LiaSearchSolid size={17} color="#fff" />
        </div>
      </div>

      {/*** main */}
      {messages.length > 0 ? (
        <MainChat />
      ) : (
        <div className="message-panel-main">
          <Lottie style={{ height: 200 }} options={defaultLottieOptions} />
          <h2 className="conversation-messages-lottie-message">
            Say hello to {selectedChat.name}
          </h2>
        </div>
      )}

      {/*** footer */}
      <div className="message-panel-footer">
        {/*** smiley */}
        <div className="message-panel-footer-icons">
          <LuSmilePlus size={17} color="#fffd" />
        </div>
        {/*** pin */}
        <div className="message-panel-footer-icons">
          <GrAttachment size={17} color="#fffd" />
        </div>
        {/*** text box */}
        <input
          type="text"
          placeholder="Type a message"
          name="message"
          value={message}
          onChange={(_e) => setMessage((prev) => _e.target.value)}
          className="message-panel-footer-message"
        />
        {/*** record / send */}
        <div className="message-panel-footer-icons">
          {message.length > 0 ? (
            <VscSend
              onClick={() => sendMessage(message)}
              size={17}
              color="#fffd"
            />
          ) : (
            <HiOutlineMicrophone size={17} color="#fffd" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
