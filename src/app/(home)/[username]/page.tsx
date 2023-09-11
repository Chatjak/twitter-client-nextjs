import Profile from '@/components/Profile';
import { user } from '@/type';
import React from 'react'

const getUser = async (username: string) => {
    const user = await fetch(`http://localhost:8080/api/user/byUser/${username}`);
    const data = await user.json()

    return data
}
export default async function page({ params }: { params: { username: string } }) {
    const user = await getUser(params.username);
    return (
        <Profile User={user} />
    )
}
