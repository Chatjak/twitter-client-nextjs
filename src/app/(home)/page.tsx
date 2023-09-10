import classes from "./index.module.scss";
import { HiOutlineSparkles } from "react-icons/hi2";
import Post from "@/components/Post";
import { post } from "../../type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Home() {
  const cookiesList = cookies();
  const hasToken = cookiesList.has("token");
  if (!hasToken) {
    redirect("/sign-in");
  }
  const res = await fetch("http://localhost:3000/api/posts");
  const data = await res.json();
  const posts = data.data;

  return (
    <>
      <div className="flex py-2 px-3 stick top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <HiOutlineSparkles />
        </div>
      </div>
      {posts &&
        posts.map((post: post) => (
          <Post key={post._id} id={post._id} post={post} />
        ))}
    </>
  );
}
