import { NextRequest, NextResponse } from "next/server";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { TestAutoUpdateHabitStatusUsecase } from "@/application/usecase/habit/TestAutoUpdateHabitStatusUsecase";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const habitId = Number(params.id);
        const usecase = new TestAutoUpdateHabitStatusUsecase(
            new SbHabitRepository(),
            new SbHabitRecordRepository()
        );
        await usecase.execute(habitId);

        return NextResponse.json({ message: "습관 상태 자동 업데이트 완료" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}