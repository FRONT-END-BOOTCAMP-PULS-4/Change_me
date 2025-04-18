import { NextRequest, NextResponse } from "next/server";
import { JoinMemberDto } from "@/application/usecase/member/dto/JoinMemberDto";
import { JoinMemberUseCase } from "@/application/usecase/member/JoinMemberUsecase";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const dto = new JoinMemberDto(
            body.name,
            body.email,
            body.password,
            body.nickname
        );

        const memberRepository = new SbMemberRepository();
        const joinMemberUseCase = new JoinMemberUseCase(memberRepository);
        const result = await joinMemberUseCase.execute(dto);

        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}