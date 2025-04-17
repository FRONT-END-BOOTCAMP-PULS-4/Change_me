import { NextRequest, NextResponse } from "next/server";
import { withdrawMemberUseCase } from "@/application/usecase/member/WithdrawMemberUsecase";

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    try {
        await withdrawMemberUseCase.execute(token!);
        return NextResponse.json({ message: "탈퇴 완료" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}