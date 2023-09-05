import Image from "next/image";
import React from "react";
import { AiFillHome, AiOutlineInbox } from "react-icons/ai";
import { HiOutlineDotsCircleHorizontal } from "react-icons/Hi";
import { BsBell, BsBookmark, BsClipboard, BsHash } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import SidebarMenuItem from "./SidebarMenuItem";
export const Sidebar = () => {
  return (
    <>
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          width="50"
          height="50"
          alt="logo_twitter"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        />
      </div>
      <div className="mt-4 mb-2 5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={AiFillHome} active />
        <SidebarMenuItem text="Explore" Icon={BsHash} />
        <SidebarMenuItem text="Notifications" Icon={BsBell} />
        <SidebarMenuItem text="Messages" Icon={AiOutlineInbox} />
        <SidebarMenuItem text="Bookmarks" Icon={BsBookmark} />
        <SidebarMenuItem text="Lists" Icon={BsClipboard} />
        <SidebarMenuItem text="Profile" Icon={BiUser} />
        <SidebarMenuItem text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <BiUser className="h-7 w-7 rounded-full xl:mr-2" />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Chatjak</h4>
          <p className="text-gray-500">@chatjak</p>
        </div>
      </div>
    </>
  );
};
