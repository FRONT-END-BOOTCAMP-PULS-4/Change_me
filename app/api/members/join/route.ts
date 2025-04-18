import { JoinMemberDto } from "@/application/usecase/member/dto/JoinMemberDto";
import { joinMemberUseCase } from "@/application/usecase/member/JoinMemberUsecase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const dto = new JoinMemberDto(
            body.name,
            body.email,
            body.password,
            body.nickname
        );
        const result = await joinMemberUseCase.execute(dto);
        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}