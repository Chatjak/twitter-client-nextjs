'use client';
import { user } from '@/type'
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai';
import Upload from './Upload';
import { useRouter } from 'next/navigation';

export default function Profile({ User, currentUserId, token }: { User: user; currentUserId: string; token: string; }) {
    const [userProfile, setUserProfile] = useState<any>(null);
    const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null)
    const [isUpload, setIsUpload] = useState<boolean>(false)
    const router = useRouter();
    const openUpload = () => {
        setIsUpload(true)
    }
    const closeUpload = () => {
        setIsUpload(false)
        window.location.reload();
    }
    useEffect(() => {
        const getUserImage = async () => {
            const userProfile = await fetch(`http://localhost:8080/api/user/${User._id}/userProfile`);
            const ImageBlob = await userProfile.blob();
            const ImageUrl = URL.createObjectURL(ImageBlob);
            setUserProfile(ImageUrl)
        }
        getUserImage()
        if (User._id === currentUserId) {
            setIsCurrentUser(true)
        } else {
            setIsCurrentUser(false)
        }
    }, [])

    return (
        <div className=''>
            {isUpload && token && <Upload token={token} closeUpload={closeUpload} />}
            <div className="h-[10rem] relative border w-full p-4 bg-slate-100 mb-24">
                <div className="absolute w-[180px] h-[180px] left-4 -bottom-[50%]  border-white border-8 rounded-full overflow-hidden bg-white'">
                    {userProfile && <Image src={userProfile} width={180} height={180} alt='' className='rounded-full' />}
                </div>
                {isCurrentUser ? <label onClick={openUpload} className='cursor-pointer hover:bg-gray-200 absolute font-bold p-2 border-2 rounded-full -bottom-[36%] right-4'>Edit Profile</label> : <label htmlFor="" className='absolute font-bold p-2 border-2 rounded-full -bottom-[36%] right-4'>Follow</label>}
                {/* <input type="file" name="uploadUserProfile" onChange={uploadPicture} id="uploadUserProfile" hidden accept="image/*" /> */}
            </div>
            <div className="p-4">
                <h1 className='text-2xl font-bold'>{User.username}</h1>
                <p className=' text-gray-400 font-light'>@{User.username}</p>
                <p className='mt-4 flex items-center font-light'><span className='text-xl mr-2'><AiOutlineCalendar /></span>Joined {moment(User.createdAt).format('MMMM Do YYYY')}</p>
            </div>
            <div className="flex justify-between items-center">
                <Link href={`/${User.username}`} className='flex items-center justify-center w-1/2 hover:bg-gray-100 h-12 relative after:absolute after:border-b-4  after:border-sky-400 after:w-1/2 after:bottom-0 font-bold' >
                    Posts
                </Link>
                <Link href={`/${User.username}/with_replies`} className='flex items-center justify-center w-1/2 hover:bg-gray-100 h-12' scroll={false}>Replies</Link>
            </div>
        </div>
    )
}


