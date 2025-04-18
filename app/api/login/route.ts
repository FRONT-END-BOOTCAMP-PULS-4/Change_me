import { NextRequest, NextResponse } from "next/server";
import { loginMemberUseCase } from "@/application/usecase/member/LoginMemberUsecase";
import { LoginMemberDto } from "@/application/usecase/member/dto/LoginMemberDto";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const dto = new LoginMemberDto(body.email, body.password);
        const result = await loginMemberUseCase.execute(dto);

        // token을 응답 바디에 포함
        return NextResponse.json(
            {
                token: result.token, // 클라이언트가 localStorage에 저장할 수 있게 전달
                user: result.user,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ errorMessage: error.message }, { status: 401 });
    }
}