import { NextRequest, NextResponse } from "next/server";
import { loginMemberUseCase } from "@/application/usecase/member/LoginMember";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const result = await loginMemberUseCase.execute(body);

        const response = NextResponse.json(result.user, { status: 200 });
        response.cookies.set("access_token", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return response;

        // return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ errorMessage: error.message }, { status: 401 });
    }
}