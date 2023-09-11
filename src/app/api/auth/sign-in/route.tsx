import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const data = await fetch("http://localhost:8080/api/auth/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!data.ok) {
    return NextResponse.json(data.status);
  }
  const result = await data.json();
  cookies().set("token", result.token, {
    httpOnly: true,
    path: "/",
    secure: true,
  });

  return NextResponse.json(result);
}
