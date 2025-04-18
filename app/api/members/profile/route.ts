import { NextRequest, NextResponse } from "next/server";
import { GetProfileUseCase } from "@/application/usecase/member/GetProfileUsecase";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { getMemberIdFromToken } from "@/utils/auth";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const memberId = await getMemberIdFromToken(authHeader!);

    try {
        const memberRepository = new SbMemberRepository();
        const getProfileUseCase = new GetProfileUseCase(memberRepository);

        const profile = await getProfileUseCase.execute(memberId!);
        return NextResponse.json(profile);
    } catch (err) {
        return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }
}