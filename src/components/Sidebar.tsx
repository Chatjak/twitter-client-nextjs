import Image from "next/image";
import React from "react";
import { AiFillHome, AiOutlineInbox } from "react-icons/ai";
import { HiOutlineDotsCircleHorizontal } from "react-icons/Hi";
import { BsBell, BsBookmark, BsClipboard, BsHash } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import SidebarMenuItem from "./SidebarMenuItem";
import Link from "next/link";
import SignOut from "./SignOut";
export const Sidebar = ({ username }: { username: string }) => {
  return (
    <>
      <Link href={'/'} className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          width="50"
          height="50"
          alt="logo_twitter"
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        />
      </Link>
      <div className="mt-4 mb-2 5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={AiFillHome} active />
        <SidebarMenuItem text="Explore" Icon={BsHash} />
        <SidebarMenuItem text="Notifications" Icon={BsBell} />
        <SidebarMenuItem text="Messages" Icon={AiOutlineInbox} />
        <SidebarMenuItem text="Bookmarks" Icon={BsBookmark} />
        <SidebarMenuItem text="Lists" Icon={BsClipboard} />
        <SidebarMenuItem text="Profile" Icon={BiUser} username={username} />
        <SidebarMenuItem text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      <SignOut />
    </>
  );
};
