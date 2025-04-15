import { NextRequest, NextResponse } from "next/server";
import { getProfileUseCase } from "@/application/usecase/member/GetProfile";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
        return NextResponse.json({ error: "토큰 없음" }, { status: 401 });
    }

    try {
        const profile = await getProfileUseCase.execute(token);
        return NextResponse.json(profile);
    } catch (err) {
        return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }
}