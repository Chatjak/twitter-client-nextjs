import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const cookiesList = cookies();
    const token = cookiesList.get("token");
    if (token) {
      const body = await req.json();
      console.log("body", body);
      const data = await fetch("http://localhost:8080/api/post/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!data.ok) {
        throw new Error();
      }
      const result = await data.json();
      revalidatePath('/')
      return NextResponse.json(result);
    }
  } catch (error) {
    console.log(error);
  }
}
