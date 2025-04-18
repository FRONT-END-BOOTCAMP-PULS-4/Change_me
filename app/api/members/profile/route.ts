import { NextRequest, NextResponse } from "next/server";
import { GetProfileUseCase } from "@/application/usecase/member/GetProfileUsecase";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    try {
        const memberRepository = new SbMemberRepository();
        const getProfileUseCase = new GetProfileUseCase(memberRepository);

        const profile = await getProfileUseCase.execute(token!);
        return NextResponse.json(profile);
    } catch (err) {
        return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }
}