import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "./utils/jwt";

export const config = {
    // /api/admin/** 및 /api/member/** 경로에 미들웨어 적용
    matcher: ["/api/admin/:path*", "/api/member/:path*"],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
        return NextResponse.json(
            {
                message: "로그인 필요",
            },
            { status: 401 },
        );
    }

    try {
        const payload = await verifyJWT(token);
        const pathname = request.nextUrl.pathname;

        if (pathname.startsWith("/api/admin") && payload.role !== 1) {
            return NextResponse.json({ message: "권한 없음" }, { status: 403 });
        }
    } catch (error) {
        return NextResponse.json(
            { message: "token이 유효하지 않음" },
            { status: 401 },
        );
    }
}
