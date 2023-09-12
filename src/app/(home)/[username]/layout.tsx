export const metadata = {
    title: "Twitter clone",
    description: "project for portfolio's chatjak",
};
const getUser = async (username: string) => {
    const user = await fetch(`http://localhost:8080/api/user/byUser/${username}`);
    const data = await user.json()
    return data
}

import Profile from "@/components/Profile";
import "../../globals.css";
import { delay, getCurrentUser, getValue } from "@/util/getFunction";
export default async function ProfileLayout({
    children, params
}: {
    children: React.ReactNode;
    params: { username: string };
}) {
    await delay(1500);
    const user = await getUser(params.username);
    const currentUser = await getCurrentUser()
    const token = await getValue()
    return <div className="relative">
        {token && <Profile User={user} currentUserId={currentUser._id} token={token} />}
        {children}
    </div>
}
