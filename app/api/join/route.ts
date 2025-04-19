import { NextRequest, NextResponse } from "next/server";
import { JoinDto } from "@/application/usecase/member/dto/JoinDto";
import { JoinUsecase } from "@/application/usecase/member/JoinUsecase";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const dto = new JoinDto(
            body.name,
            body.email,
            body.password,
            body.nickname,
        );

        const memberRepository = new SbMemberRepository();
        const joinMemberUseCase = new JoinUsecase(memberRepository);
        await joinMemberUseCase.execute(dto);

        return NextResponse.json({message : "가입 성공"}, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
            { message: error.message || "가입 실패" },
            { status: 400 },
        );
    }
    return NextResponse.json(
        { message: "알 수 없는 오류 발생" },
        { status: 500 },
    );
}
    }
}
