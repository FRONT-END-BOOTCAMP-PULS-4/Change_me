import { NextRequest, NextResponse } from "next/server";
import { checkEmailDuplicateUsecase } from "@/application/usecase/member/CheckEmailDuplicateUsecase";

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "이메일을 입력해주세요." }, { status: 400 });
    }

    const result = await checkEmailDuplicateUsecase.execute(email);
    return NextResponse.json(result);
}