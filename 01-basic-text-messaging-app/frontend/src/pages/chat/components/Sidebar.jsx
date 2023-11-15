import React, { useState } from "react";
import { IoMdChatbubbles } from "react-icons/io"; // logo
import { GoPlus } from "react-icons/go"; // plus
import { CgStories } from "react-icons/cg"; // stories
import { LuCircleDotDashed } from "react-icons/lu"; // stories 2.0
import { BsChatText } from "react-icons/bs"; // chat
import { IoPeopleOutline } from "react-icons/io5"; // community
import { IoCallOutline } from "react-icons/io5"; // call
import { IoSettingsOutline } from "react-icons/io5"; // settings
import NavIcons from "./NavIcons";
import Image from "../../../components/Image";

function Sidebar() {
  const [active, setActive] = useState("chat");
  return (
    <div className="sidebar">
      {/*** logo */}

      <div className="logo">
        <IoMdChatbubbles size={18} color="#fffa" />
      </div>
      {/*** nav icons */}
      {/**** add */}
      <NavIcons
        active={active}
        setActive={setActive}
        name="add"
        icon={<GoPlus size={18} color="#fffa" />}
        badge={null}
      />
      {/**** status */}
      <NavIcons
        active={active}
        setActive={setActive}
        name="story"
        icon={<LuCircleDotDashed size={18} color="#fffa" />}
        badge={null}
      />
      {/**** chat */}
      <NavIcons
        active={active}
        setActive={setActive}
        icon={<BsChatText size={18} color="#fffa" />}
        badge={8}
        name="chat"
      />
      {/**** community */}
      <NavIcons
        active={active}
        setActive={setActive}
        icon={<IoPeopleOutline size={18} color="#fffa" />}
        badge={12}
        name="community"
      />
      {/*** call */}
      <NavIcons
        active={active}
        setActive={setActive}
        name="call"
        icon={<IoCallOutline size={18} color="#fffa" />}
        badge={2}
      />

      {/*** bottom icons */}
      <div className="sidebar-footer">
        <NavIcons
          name="settings"
          icon={<IoSettingsOutline size={20} color="#fffa" />}
        />
        {/*** profile */}
        <Image
          src="https://avatar.iran.liara.run/public/boy"
          alt="profile"
          style={{
            width: "50%",
            aspectRatio: 1,
            borderRadius: 100,
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
