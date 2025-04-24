import { NextRequest, NextResponse } from "next/server";
import { TestDeleteHabitUsecase } from "@/application/usecase/habit/TestDeleteHabitUsecase";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { getMemberIdFromToken } from "@/utils/auth";
import { TestUpdateHabitDto } from "@/application/usecase/habit/dto/TestUpdateHabitDto";
import { TestUpdateHabitUsecase } from "@/application/usecase/habit/TestUpdateHabitUsecase";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const habitId = Number(params.id);
        const usecase = new TestDeleteHabitUsecase(new SbHabitRepository());
        await usecase.execute(habitId);

        return NextResponse.json({ message: "습관 삭제 완료" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const { categoryId, name, description, finishedAt } = await req.json();

        const authHeader = req.headers.get("authorization");
        const memberId = await getMemberIdFromToken(authHeader!);

        const dto = new TestUpdateHabitDto(id, memberId!, categoryId, name, description, finishedAt);
        const usecase = new TestUpdateHabitUsecase(new SbHabitRepository());
        await usecase.execute(dto);

        return NextResponse.json({ message: "습관 수정 완료" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}