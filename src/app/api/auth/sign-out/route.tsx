import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function DELETE() {
    const token = cookies().get('token')
    await fetch(`http://localhost:8080/api/auth/sign-out`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token?.value}`
        }
    })
    cookies().delete('token')
    redirect('/sign-in')

}
