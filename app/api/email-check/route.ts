import { NextRequest, NextResponse } from "next/server";
import { CheckEmailDuplicateUsecase } from "@/application/usecase/member/CheckEmailDuplicateUsecase";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json(
            { error: "이메일을 입력해주세요." },
            { status: 400 }
        );
    }

    const memberRepository = new SbMemberRepository();
    const checkEmailDuplicateUsecase = new CheckEmailDuplicateUsecase(memberRepository);
    const result = await checkEmailDuplicateUsecase.execute(email);

    return NextResponse.json(result);
}