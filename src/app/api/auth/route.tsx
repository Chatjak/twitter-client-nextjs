import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const data = await fetch("http://localhost:8080/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await data.json();
  return NextResponse.json(result);
}
