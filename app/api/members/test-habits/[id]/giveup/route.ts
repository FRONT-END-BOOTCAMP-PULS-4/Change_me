import { NextRequest, NextResponse } from "next/server";
import { GiveUpHabitUsecase } from "@/application/usecase/habit/GiveUpHabitUsecase";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const habitId = Number(params.id);
        const usecase = new GiveUpHabitUsecase(new SbHabitRepository());
        await usecase.execute(habitId);

        return NextResponse.json({ message: "습관 포기 완료" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}