import { NextRequest, NextResponse } from "next/server";
import { LoginUsecase } from "@/application/usecase/member/LoginUsecase";
import { LoginDto } from "@/application/usecase/member/dto/LoginDto";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { LoggedInDto } from "@/application/usecase/member/dto/LoggedInDto";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const dto = new LoginDto(body.email, body.password);
        const memberRepository = new SbMemberRepository();
        const loginMemberUseCase = new LoginUsecase(memberRepository);

        const result: LoggedInDto = await loginMemberUseCase.execute(dto);

        return NextResponse.json(
            {
                token: result.token,
                user: result.user,
            },
            { status: 200 },
        );
    } catch (error: any) {
        return NextResponse.json(
            { errorMessage: error.message },
            { status: 401 },
        );
    }
}
