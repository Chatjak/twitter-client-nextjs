"use client";
import React, { useEffect, useState } from "react";
import { post } from "../type";
import moment from "moment";
import Image, { StaticImageData } from "next/image";
import {
  HiOutlineChartBar,
  HiOutlineDotsCircleHorizontal,
  HiOutlineDotsHorizontal,
} from "react-icons/Hi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
export default function Post({ id, post }: { id: string; post: post }) {
  const [userProfile, setUserProfile]: any = useState(null);

  useEffect(() => {
    const getServerSide = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/user/${post.user_id._id}/userProfile`
        );
        if (!res.ok) {
          throw new Error();
        }
        const imageBlob = await res.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setUserProfile(imageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    getServerSide();
  }, []);
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 ">
      {userProfile && (
        <Image
          src={userProfile}
          width={44}
          height={44}
          alt="profile"
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.user_id.username}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post.user_id.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {moment().startOf("day").from(post.createdAt)}
            </span>
          </div>
          <div className="h-10 w-10 hoverEffect flex items-center justify-center hover:bg-sky-100 hover:text-sky-500">
            <BsThreeDots className="text-xl" />
          </div>
        </div>
        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2 mt-2">
          {post.content}
        </p>
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <HiOutlineChatBubbleOvalLeftEllipsis className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
          <div className="flex items-center">
            <AiOutlineHeart className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          </div>
          <AiOutlineShareAlt className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <HiOutlineChartBar className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
