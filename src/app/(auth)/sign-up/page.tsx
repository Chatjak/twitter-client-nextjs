import SignIn from "@/components/SignIn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
    const cookiesList = cookies();

    return <SignIn />;
}
