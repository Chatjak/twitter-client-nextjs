import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  //   const username = searchParams.get("username");
  const obj = Object.fromEntries(searchParams.entries());
  return NextResponse.json(obj);
}
