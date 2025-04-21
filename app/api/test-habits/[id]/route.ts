import { NextRequest, NextResponse } from "next/server";
import { TestDeleteHabitUsecase } from "@/application/usecase/habit/TestDeleteHabitUsecase";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";

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