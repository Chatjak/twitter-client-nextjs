import Link from 'next/link'
import React from 'react'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import SignOut from './SignOut'

export default function BottomBar({ username }: { username: string }) {
    return (
        <div className='fixed bottom-0 z-50 h-auto w-full bg-white shadow sm:hidden'>
            <div className="flex  w-full h-full  justify-around p-1">
                <Link href={'/'} className='flex items-center justify-center  hoverEffect'><AiOutlineHome className='w-7 h-7' /></Link>
                <Link href={`${username}`} className='flex items-center justify-center w-7 hoverEffect'><BiUser className='w-7 h-7' /></Link>
                <SignOut />
            </div>
        </div>
    )
}
