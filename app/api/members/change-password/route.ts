import { NextRequest, NextResponse } from "next/server";
import { getMemberIdFromToken } from "@/utils/auth";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { ChangePasswordUsecase } from "@/application/usecase/member/ChangePasswordUsecase";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const memberId = await getMemberIdFromToken(authHeader!);

    const { newPassword } = await req.json();

    try {
        const memberRepository = new SbMemberRepository();
        const changePasswordUsecase = new ChangePasswordUsecase(memberRepository);

        await changePasswordUsecase.execute(memberId!, newPassword);

        return NextResponse.json({ message: "변경 성공" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}