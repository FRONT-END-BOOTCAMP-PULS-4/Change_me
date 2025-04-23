import { NextRequest, NextResponse } from "next/server";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { getMemberIdFromToken } from "@/utils/auth";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { TestGetFailHabitsUsecase } from "@/application/usecase/habit/TestGetFailHabitsUsecase";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        const memberId = await getMemberIdFromToken(authHeader!);
        const habitRepo = new SbHabitRepository();
        const recordRepo = new SbHabitRecordRepository();
        const usecase = new TestGetFailHabitsUsecase(habitRepo, recordRepo);
        const habits = await usecase.execute(memberId!);

        return NextResponse.json({ habits });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}