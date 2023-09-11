"use server";
import { deleteToken } from "@/app/action";
import { error } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const token = await req.json();
  try {
    const response = await fetch(`http://localhost:8080/api/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 401) {
      const errorToken = cookies().delete(token);
      return NextResponse.json(true);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
