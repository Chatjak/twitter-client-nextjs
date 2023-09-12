'use client'
import { commentModel } from '@/type'
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs';

export default function Comment({ id, comment }: { id: string, comment: commentModel }) {
    const [userProfile, setUserProfile]: any = useState(null);
    useEffect(() => {
        const getServerSide = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8080/api/user/${comment.user_id._id}/userProfile`
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
        <div className="flex p-3 border-b border-gray-200">
            <div className="h-11 w-11 mr-4">
                {userProfile && <Image src={userProfile} width={44} height={44} alt='' className='h-11 w-11 rounded-full' />}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 whitespace-nowrap">

                        <Link href={`/${comment.user_id.username}`} className="font-bold text-[15px] sm:text-[16px] hover:underline">
                            {comment.user_id.username}
                        </Link>
                        <span className="text-sm sm:text-[15px]">
                            @{comment.user_id.username} -{" "}
                        </span>
                        <span className="text-sm sm:text-[15px] hover:underline">
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                    <div className="h-10 w-10 hoverEffect flex items-center justify-center hover:bg-sky-100 hover:text-sky-500">
                        <BsThreeDots className="text-xl" />
                    </div>
                </div>
                <p className="text-gray-800 text-[15px sm:text-[16px] mb-2 mt-2 line-clamp-4">
                    {comment.content}
                </p>
            </div>
        </div>
    )
}
