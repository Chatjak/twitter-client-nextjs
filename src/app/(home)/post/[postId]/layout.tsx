import Comment from "@/components/CreateComment";
import Post from "@/components/Post";
import { getCurrentUser, getValue } from "@/util/getFunction";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Twitter clone",
    description: "project for portfolio's chatjak",
};


const getPost = async (postId: string) => {
    const res = await fetch(`http://localhost:8080/api/post/${postId}`);
    if (!res.ok) {
        notFound()
    }
    const post = await res.json()
    return post

}

export default async function PostLayout({
    children, params
}: {
    children: React.ReactNode;
    params: { postId: string };
}) {
    const post = await getPost(params.postId)
    const User = await getCurrentUser()
    const token = await getValue()
    return <>
        <div className="flex py-2 px-3 stick top-0 z-50 bg-white border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Post</h2>
        </div>
        {token && <Post key={post._id} id={post._id} post={post} token={token} User={User} />}
        {children}
    </>
}