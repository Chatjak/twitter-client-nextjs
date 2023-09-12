import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const getCurrentUser = async () => {
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
    return User
}


export const getComments = async (postId: string) => {
    const response = await fetch(`http://localhost:8080/api/comment/${postId}`)
    const data = await response.json()
    return data
}

export const logout = async () => {
    const cookiesList = cookies();
    cookiesList.delete('token')
    redirect('/sign-in')
}


export const getValue = async () => {
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    if (token) return token.value
}