import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: "로그아웃 성공" });

    // 쿠키에서 access_token 삭제
    response.cookies.set("access_token", "", {
        maxAge: 0,
        path: "/",
    });

    return response;
}