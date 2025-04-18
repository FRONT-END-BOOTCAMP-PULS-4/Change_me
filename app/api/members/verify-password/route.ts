import { NextRequest, NextResponse } from "next/server";
import { getMemberIdFromToken } from "@/utils/auth";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { VerifyPasswordUsecase } from "@/application/usecase/member/VerifyPasswordUsecase";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const memberId = await getMemberIdFromToken(authHeader!);

    const { password } = await req.json();
    if (!password) {
        return NextResponse.json({ error: "비밀번호가 필요합니다" }, { status: 400 });
    }

    const memberRepository = new SbMemberRepository();
    const verifyPasswordUsecase = new VerifyPasswordUsecase(memberRepository);
    const isValid = await verifyPasswordUsecase.execute(memberId!, password);

    return NextResponse.json({ valid: isValid });
}