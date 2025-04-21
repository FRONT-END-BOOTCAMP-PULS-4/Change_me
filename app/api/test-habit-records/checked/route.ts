import { NextRequest, NextResponse } from "next/server";
import { getMemberIdFromToken } from "@/utils/auth";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { TestGetTodayHabitRecordDto } from "@/application/usecase/habit/dto/TestGetTodayHabitRecordDto";
import { TestGetTodayCheckedHabitIdsUsecase } from "@/application/usecase/habit/TestGetTodayCheckedHabitIdsUsecase";

export async function GET(req: NextRequest) {
    try {
        console.log("GET /api/test-habit-records/checked 시작");
        const authHeader = req.headers.get("authorization");
        const memberId = await getMemberIdFromToken(authHeader!);
        const today = new Date();

        const dto = new TestGetTodayHabitRecordDto(memberId!, today);
        const usecase = new TestGetTodayCheckedHabitIdsUsecase(new SbHabitRecordRepository());
        const checkedIds = await usecase.execute(dto);

        return NextResponse.json({ checkedIds });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}