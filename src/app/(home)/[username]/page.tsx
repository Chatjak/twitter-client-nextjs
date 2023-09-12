import Post from '@/components/Post';
import { post } from '@/type';
import { delay } from '@/util/getFunction'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page({ params }: { params: { username: string } }) {
    await delay(1500);
    const cookiesList = cookies();
    const token = cookiesList.get('token');
    const hasToken = cookiesList.has('token');
    if (!hasToken) {
        redirect('/sign-in')
    }
    const response = await fetch(`http://localhost:3000/api/getUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(token?.value),
    });
    const User = await response.json();
    if (User === true) {
        redirect("/sign-in");
    }
    const res = await fetch(`http://localhost:8080/api/post/${params.username}/allPosts`);
    const data = await res.json();
    const posts = data;

    return <>
        {posts && token &&
            posts.map((post: post) => (
                <Post key={post._id} id={post._id} post={post} token={token.value} User={User} />
            ))}
    </>
}
