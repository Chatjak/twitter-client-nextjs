'use client';
import { user } from '@/type'
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai';

export default function Profile({ User }: { User: user }) {
    const [userProfile, setUserProfile] = useState<any>(null);
    useEffect(() => {
        const getUserImage = async () => {
            const userProfile = await fetch(`http://localhost:8080/api/user/${User._id}/userProfile`);
            const ImageBlob = await userProfile.blob();
            const ImageUrl = URL.createObjectURL(ImageBlob);
            setUserProfile(ImageUrl)
        }
        getUserImage()
    }, [])
    return (
        <div>
            <div className="h-[10rem] relative border w-full p-4 bg-slate-100 mb-24">
                <div className="absolute w-[180px] h-[180px] left-4 -bottom-[50%]  border-white border-8 rounded-full overflow-hidden bg-white'">
                    {userProfile && <Image src={userProfile} width={180} height={180} alt='' className='rounded-full' />}
                </div>
                <label htmlFor="uploadUserProfile" className='absolute font-bold p-2 border-2 rounded-full -bottom-[36%] right-4'>Edit Profile</label>
                <input type="file" name="uploadUserProfile" id="uploadUserProfile" hidden />
            </div>
            <div className="p-4">

                <h1 className='text-2xl font-bold'>{User.username}</h1>
                <p className=' text-gray-400 font-light'>@{User.username}</p>
                <p className='mt-4 flex items-center font-light'><span className='text-xl mr-2'><AiOutlineCalendar /></span>Joined {moment(User.createdAt).format('MMMM Do YYYY')}</p>
            </div>
        </div>
    )
}
