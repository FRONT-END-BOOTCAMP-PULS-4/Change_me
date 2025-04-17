import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "./utils/jwt";

const PUBLIC_PATHS = [
    "/api/categories",
    "/anon",
    "/api/members/email-check",
    "/api/members/join",
    "/api/members/login",
];

function isPublicRoute(pathname: string) {
    return PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath));
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (isPublicRoute(pathname)) {
        return NextResponse.next();
    }

    if (!pathname.startsWith("/api")) {
        return NextResponse.next(); // 페이지 라우트는 인증 검사 안 함
    }

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
