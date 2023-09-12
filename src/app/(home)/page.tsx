import { HiOutlineSparkles } from "react-icons/hi2";
import Post from "@/components/Post";
import { post } from "../../type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Create from "@/components/Create";
import { delay } from "@/util/getFunction";


export default async function Home() {
  await delay(1500);
  const cookiesList = cookies();
  const token = cookiesList.get("token");
  const hasToken = cookiesList.has("token");
  if (!hasToken) {
    redirect("/sign-in");
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
  const res = await fetch("http://localhost:8080/api/post");

  const data = await res.json();
  const posts = data;

  return (
    <>
      <div className="flex py-2 px-3 stick top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <HiOutlineSparkles />
        </div>
      </div>
      {token && <Create User={User} token={token.value} />}

      {posts && token &&
        posts.map((post: post) => (
          <Post key={post._id} id={post._id} post={post} token={token.value} User={User} />
        ))}
    </>
  );
}
