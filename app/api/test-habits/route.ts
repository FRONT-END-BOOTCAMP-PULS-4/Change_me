import { NextRequest, NextResponse } from "next/server";
import { TestCreateHabitDto } from "@/application/usecase/habit/dto/TestCreateHabitDto";
import { TestCreateHabitUsecase } from "@/application/usecase/habit/TestCreateHabitUsecase";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { verifyJWT } from "@/utils/jwt";
import { getMemberIdFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        const memberId = await getMemberIdFromToken(authHeader!);

        console.log("memberId", memberId);

        const { categoryId, name, description, finishedAt } = await req.json();
        const dto = new TestCreateHabitDto(memberId!, categoryId, name, description, finishedAt);
        const repo = new SbHabitRepository();
        const usecase = new TestCreateHabitUsecase(repo);
        await usecase.execute(dto);

        return NextResponse.json({ message: "습관 등록 완료" }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}