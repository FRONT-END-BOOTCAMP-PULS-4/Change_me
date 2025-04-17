import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { verifyJWT } from "@/utils/jwt";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
        return NextResponse.json({ error: "권한 없음" }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    if (!payload || typeof payload !== "object" || !("id" in payload)) {
        return NextResponse.json({ error: "유효하지 않은 토큰" }, { status: 401 });
    }

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
    await memberRepository.changePassword(payload.id as string, hashed);

    return NextResponse.json({ message: "변경 성공" });
}