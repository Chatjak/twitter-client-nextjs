import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  const id = await req.json();
  try {
    const res = await fetch(`http://localhost:8080/api/user/${id}/userProfile`);
    if (!res.ok) {
      throw new Error();
    }
    const imageBlob = await res.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    return NextResponse.json(imageUrl);
  } catch (error) {
    console.log(error);
  }
}
