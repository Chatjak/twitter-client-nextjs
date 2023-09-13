'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, {
    useState,
} from "react";

export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const createAccount = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)

        const res = await fetch('http://localhost:3000/api/auth/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, username, password
            })
        })
        if (!res.ok) {
            setIsError(true);
            setIsLoading(false)
        } else {
            router.push('/')
        }

    }

    return <form onSubmit={createAccount}
        className="h-auto w-[90%] sm:shadow-lg sm:rounded-2xl"
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
            <h1 className="font-bold text-xl my-4">Sign up to Twitter</h1>
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
                type="text"
                placeholder="Username"
                required
                name="username"
                value={username} // Use state variable here
                onChange={(e) => setUsername(e.target.value)} // Update the 'email' state
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
                    Already have an email or username? Please try again.
                </p>
            )}
            <button
                disabled={isLoading}
                type="submit"
                className=" transition-all duration-300 w-full border py-1 rounded-full bg-sky-500 text-white font-bold hover:bg-sky-600 mb-8"
            >
                {isLoading ? "Signing..." : "Sign up"}
            </button>
            <p>
                {`Have an account already?`}{" "}
                <Link href={"/sign-in"} className="text-sky-400 hover:underline">
                    Sign in
                </Link>{" "}
            </p>
        </div>
    </form>
}
