import { joinMemberUseCase } from "@/application/usecase/member/JoinMemberUsecase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("회원가입 API 호출됨");
    const body = await req.json();

    try {
        const result = await joinMemberUseCase.execute(body);
        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}