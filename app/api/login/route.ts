import { NextRequest, NextResponse } from "next/server";
import { LoginMemberUseCase } from "@/application/usecase/member/LoginMemberUsecase";
import { LoginMemberDto } from "@/application/usecase/member/dto/LoginMemberDto";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const dto = new LoginMemberDto(body.email, body.password);
        const memberRepository = new SbMemberRepository();
        const loginMemberUseCase = new LoginMemberUseCase(memberRepository);

        const result = await loginMemberUseCase.execute(dto);

        return NextResponse.json(
            {
                token: result.token,
                user: result.user,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ errorMessage: error.message }, { status: 401 });
    }
}