'use client'
import React from 'react'
import { GoSignOut } from 'react-icons/go'

export default function SignOut() {
    const onSignOut = async (event: React.FormEvent) => {
        event.preventDefault()
        await fetch('http://localhost:3000/api/auth/sign-out', { method: 'DELETE' })
        window.location.reload()
    }
    return (
        <form onSubmit={onSignOut} className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto w-full">
            <button type='submit' className='flex items-center' >
                <GoSignOut className="h-7 w-7 rounded-full xl:mr-2" />
                <div className="leading-5 hidden xl:inline">
                    <h4 className="font-bold">Sign out</h4>
                </div>
            </button>
        </form>

    )
}
