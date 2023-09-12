"use client";
import React, {
  FormEventHandler,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { user } from "../type";
import Image from "next/image";
import { BsCardImage } from "react-icons/bs";
import { useRouter } from "next/navigation";
export default function Create({
  User,

  token,
}: {
  User: user;

  token: string;
}) {
  const [ImageProfile, setImageProfile] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const getImage = async () => {
      const resImage = await fetch(
        "http://localhost:8080/api/user/me/userProfile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!resImage.ok) {
        throw new Error();
      }
      const userProfile = await resImage.blob();
      const ImageURL = URL.createObjectURL(userProfile);
      setImageProfile(ImageURL);
    };
    getImage();
  }, []);
  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await fetch("http://localhost:3000/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    setContent("");
    router.refresh();
    if (!res.ok) {
      throw new Error();
    }
  };
  return (
    <form onSubmit={create} className="flex p-3 border-b border-gray-200">
      <div className="w-11 h-11 mr-4 ">
        {ImageProfile && (
          <Image
            src={ImageProfile}
            width={44}
            height={44}
            alt="profile"
            className="h-11 w-11 rounded-full"
          />
        )}
      </div>

      <div className="flex flex-col flex-1 ">
        <input
          type="text"
          name="content"
          id="content"
          placeholder="What is happening?!"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="px-2 py-1 w-full border-none outline-none text-[15px] sm:text-[16px] h-11 mb-2"
        />
        <div className="flex justify-between items-center px-2">
          <BsCardImage className="text-gray-300 pl-2 h-6 w-6" />
          <button
            type="submit"
            disabled={!content}
            className={`${content ? "text-sky-500" : "text-gray-300"}`}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
