import { NextRequest, NextResponse } from "next/server";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { id, password } = await req.json();

    if (!id || !password) {
        return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
    }

    const member = await memberRepository.findById(id);
    if (!member) {
        return NextResponse.json({ valid: false }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, member.password);
    return NextResponse.json({ valid: isValid });
}