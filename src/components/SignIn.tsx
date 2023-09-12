"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useEffect,
} from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if ((await res.json()) === 400) {
      setIsError(true);
      setIsLoading(false);
    } else {
      router.push("/");
    }
    // setIsLoading(false);
  };
  return (
    <form
      onSubmit={onSignIn}
      className="h-auto w-full sm:shadow-lg sm:rounded-2xl"
    >
      <div className="mx-w-[100%] sm:max-w-[80%] mx-auto p-8">
        <Link href={"/"} className="flex justify-center">
          <Image
            width="50"
            height="50"
            alt="logo_twitter"
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          />
        </Link>
        <h1 className="font-bold text-xl my-4">Sign in to Twitter</h1>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email} // Use state variable here
          onChange={(e) => setEmail(e.target.value)} // Update the 'email' state
          className="border p-4 w-full focus:outline-none rounded-md focus:drop-shadow-lg mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password} // Use state variable here
          onChange={(e) => setPassword(e.target.value)} // Update the 'password' state
          className="border p-4 w-full focus:outline-none rounded-md focus:drop-shadow-lg mb-4 "
        />
        {isError && (
          <p className="bg-red-400 mb-4 p-2 rounded-md">
            Email or password incorrect
          </p>
        )}
        <button
          disabled={isLoading}
          type="submit"
          className=" transition-all duration-300 w-full border py-1 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-600 mb-8"
        >
          {isLoading ? "Signing..." : "Sign in"}
        </button>
        <p>
          {`Don't have an account?`}{" "}
          <Link href={"/sign-up"} className="text-sky-400 hover:underline">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </form>
  );
}
