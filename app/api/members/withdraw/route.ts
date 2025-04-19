import { NextRequest, NextResponse } from "next/server";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { WithdrawUsecase } from "@/application/usecase/member/WithdrawUsecase";
import { getMemberIdFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const memberId = await getMemberIdFromToken(authHeader!);

    try {
        const memberRepository = new SbMemberRepository();
        const withdrawMemberUseCase = new WithdrawUsecase(memberRepository);
        await withdrawMemberUseCase.execute(memberId!);

        return NextResponse.json({ message: "탈퇴 완료" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
