'use client'
import { user } from '@/type'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsCardImage } from 'react-icons/bs';

export default function Comment({ User, token }: { User: user; token: string }) {
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
    return <form className="flex p-3 border-b border-gray-200">
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
                placeholder="Post your reply..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="px-2 py-1 w-full border-none outline-none text-[15px] sm:text-[16px] h-11 mb-2"
            />
            <div className="flex justify-end items-center px-2">
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
}
