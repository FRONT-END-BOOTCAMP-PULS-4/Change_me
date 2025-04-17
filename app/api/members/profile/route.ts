import { NextRequest, NextResponse } from "next/server";
import { getProfileUseCase } from "@/application/usecase/member/GetProfileUsecase";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    try {
        const profile = await getProfileUseCase.execute(token!);
        return NextResponse.json(profile);
    } catch (err) {
        return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }
}