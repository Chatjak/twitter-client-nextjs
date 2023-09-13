import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req: NextRequest, res: NextResponse) {
  const hasToken = cookies().has('token')
  if (hasToken) {
    cookies().delete('token')
  }
  const body = await req.json();
  const data = await fetch("http://localhost:8080/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!data.ok) {
    throw new Error()
  }
  const result = await data.json();
  cookies().set('token', result.token, {
    httpOnly: true,
    path: '/',
    secure: true
  })
  return NextResponse.json(result);
}
