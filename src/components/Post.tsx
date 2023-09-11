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
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { BsThreeDots, BsTrash3 } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Post({
  id,
  post,
  token,
  User,
}: {
  id: string;
  post: post;
  token: string;
  User: string
}) {
  const [userProfile, setUserProfile]: any = useState(null);
  const [totalLike, setTotalLike] = useState<number | null>(null);
  const [itYourPost, setItYourPost] = useState<boolean>(false)
  const [hasLiked, setHasLiked] = useState<boolean | null>(null)
  const router = useRouter();
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
        if (User._id === post.user_id._id) {
          setItYourPost(true)
        }
      } catch (error) {
        console.log(error);
      }
    };
    getServerSide();
  }, []);
  //get totalLike
  useEffect(() => {
    const getTotalLike = async () => {
      const res = await fetch(
        `http://localhost:8080/api/like/${post._id}/total`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error();
      }
      const data = await res.json();
      setTotalLike(data);
    };
    const hasLike = async () => {
      const res = await fetch(`http://localhost:8080/api/like/${post._id}/hasLike`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const result = await res.json()
      setHasLiked(result)
    }
    getTotalLike();
    hasLike()
  }, []);

  const Unlike = async () => {
    setHasLiked(false)
    await fetch(`http://localhost:8080/api/like/${id}`, {
      method: 'DELETE', headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  const Liked = async () => {
    setHasLiked(true)
    await fetch(`http://localhost:8080/api/like/${id}`, {
      method: 'POST', headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  const deletePost = async () => {
    await fetch(`http://localhost:8080/api/post/${id}`, {
      method: 'DELETE', headers: {
        Authorization: `Bearer ${token}`
      }
    })
    router.refresh();
  }
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 ">
      <div className="h-11 w-11 mr-4">
        {userProfile && (
          <Image
            src={userProfile}
            width={44}
            height={44}
            alt="profile"
            className="h-11 w-11 rounded-full"
          />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">

            <Link href={`/${post.user_id.username}`} className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.user_id.username}
            </Link>
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
        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2 mt-2 line-clamp-4">
          {post.content}
        </p>
        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <HiOutlineChatBubbleOvalLeftEllipsis className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
          <div className="flex items-center">
            {hasLiked ? <AiFillHeart className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" onClick={Unlike} /> : <AiOutlineHeart onClick={Liked} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />}
          </div>
          {itYourPost ? <BsTrash3 className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" onClick={deletePost} /> : <AiOutlineShareAlt className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />}
          <HiOutlineChartBar className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}
