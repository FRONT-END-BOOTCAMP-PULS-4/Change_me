import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { verifyJWT } from "@/utils/jwt";
import { getMemberIdFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const memberId = await getMemberIdFromToken(authHeader!);

    const { newPassword } = await req.json();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
    if (!newPassword || !passwordRegex.test(newPassword)) {
        return NextResponse.json(
            {
                error:
                    "비밀번호는 8~16자이며, 영문/숫자/특수문자를 모두 포함해야 합니다.",
            },
            { status: 400 }
        );
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await memberRepository.changePassword(memberId as string, hashed);

    return NextResponse.json({ message: "변경 성공" });
}