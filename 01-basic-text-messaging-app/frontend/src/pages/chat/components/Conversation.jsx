import React, { useRef, useState } from "react";
import Image from "../../../components/Image";
import Lottie from "react-lottie";
import hell01 from "../../../assets/lottie/lottie-08.json";
import hell02 from "../../../assets/lottie/lottie-07.json";
import hell03 from "../../../assets/lottie/lottie-06.json";
import hell04 from "../../../assets/lottie/lottie-03.json";
import hell05 from "../../../assets/lottie/lottie-04.json";
import hell06 from "../../../assets/lottie/lottie-01.json";
import hell07 from "../../../assets/lottie/lottie-09.json";
import hell08 from "../../../assets/lottie/lottie-10.json";
const hello = [hell01, hell02, hell03, hell04, hell05, hell06, hell07, hell08];

// icons
import { CiVideoOn } from "react-icons/ci"; // video call
import { IoCallOutline } from "react-icons/io5"; // voice call
import { LiaSearchSolid } from "react-icons/lia"; // search
import { LuSmilePlus } from "react-icons/lu"; // smiley
import { GrAttachment } from "react-icons/gr"; // attachment
import { HiOutlineMicrophone } from "react-icons/hi2"; // microphone
import { VscSend } from "react-icons/vsc"; // send
import { useChatContext } from "../context/ChatContext";
import MainChat from "./MainChat";
import useSendMessage from "../../../hooks/useSendMessage";
import { useUserContext } from "../../../context/UserContext";
import { useSocket } from "../../../context/SocketContext";

function Conversation() {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const { selectedChat, messages } = useChatContext();
  const { loading: messageLoading, sendMessage } = useSendMessage();
  const { onlineUsers } = useSocket();
  const online = onlineUsers[selectedChat.users._id];

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: hello[Math.floor(Math.random() * hello.length)],
  };

  const handleEnterPressed = (event) => {
    if (event.keyCode === 13) {
      // enter is pressed
      if (message.length === 0) return;

      sendMessage(message);
      setMessage("");
    }
  };

  const send = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="message-panel">
      {/*** header */}
      <div className="message-panel-header">
        {/**** left */}
        <div className="message-panel-header-profile">
          {/*** profile image */}
          <Image
            src={selectedChat.users.profile}
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
            <p className="message-panel-header-profile-name">
              {selectedChat.users.name}
            </p>
            <p
              className={`message-panel-header-profile-online ${
                online ? "green" : "gray"
              }`}
            >
              {online ? "online" : "offline"}
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
          <Lottie style={{ height: 300 }} options={defaultLottieOptions} />
          <h2 className="conversation-messages-lottie-message">
            Say hello to {selectedChat.users.name}
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
          ref={inputRef}
          autoComplete="off"
          type="text"
          placeholder="Type a message"
          name="message"
          value={message}
          onChange={(_e) => setMessage((prev) => _e.target.value)}
          onKeyDown={handleEnterPressed}
          className="message-panel-footer-message"
        />
        {/*** record / send */}
        <div className="message-panel-footer-icons">
          {message.length > 0 ? (
            <VscSend onClick={send} size={17} color="#fffd" />
          ) : (
            <HiOutlineMicrophone size={17} color="#fffd" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
