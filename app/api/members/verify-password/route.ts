import { NextRequest, NextResponse } from "next/server";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { verifyJWT } from "@/utils/jwt";
import bcrypt from "bcrypt";
import { getMemberIdFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const memberId = await getMemberIdFromToken(authHeader!);

    const { password } = await req.json();
    if (!password) {
        return NextResponse.json({ error: "비밀번호가 필요합니다" }, { status: 400 });
    }

    const member = await memberRepository.findById(memberId!);
    if (!member) {
        return NextResponse.json({ valid: false }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, member.password);
    return NextResponse.json({ valid: isValid });
}