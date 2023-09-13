import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
    return <SignUp />;
}
