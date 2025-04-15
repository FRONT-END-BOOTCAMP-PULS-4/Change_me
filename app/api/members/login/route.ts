import { NextRequest, NextResponse } from "next/server";
import { loginMemberUseCase } from "@/application/usecase/member/LoginMember";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const result = await loginMemberUseCase.execute(body);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ errorMessage: error.message }, { status: 401 });
    }
}