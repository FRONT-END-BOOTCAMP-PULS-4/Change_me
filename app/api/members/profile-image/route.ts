import { NextRequest, NextResponse } from "next/server";
import { updateProfileUsecase } from "@/application/usecase/member/UpdateProfileUsecase";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const memberId = formData.get("id") as string;
    const nickname = formData.get("nickname") as string;

    if (!memberId || !nickname) {
        return NextResponse.json({ error: "id 또는 nickname 누락" }, { status: 400 });
    }

    try {
        const imageUrl = await updateProfileUsecase.execute(memberId, nickname, file ?? undefined);
        return NextResponse.json({ imageUrl });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}