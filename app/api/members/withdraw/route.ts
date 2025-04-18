import { NextRequest, NextResponse } from "next/server";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { WithdrawMemberUseCase } from "@/application/usecase/member/WithdrawMemberUsecase";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    try {
        const memberRepository = new SbMemberRepository();
        const withdrawMemberUseCase = new WithdrawMemberUseCase(memberRepository);
        await withdrawMemberUseCase.execute(token!);

        return NextResponse.json({ message: "탈퇴 완료" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}