import { NextRequest, NextResponse } from "next/server";
import { getMemberIdFromToken } from "@/utils/auth";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { GetTodayHabitRecordDto } from "@/application/usecase/habit/dto/GetTodayHabitRecordDto";
import { GetTodayCheckedHabitIdsUsecase } from "@/application/usecase/habit/GetTodayCheckedHabitIdsUsecase";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        const memberId = await getMemberIdFromToken(authHeader!);
        const today = new Date();

        const dto = new GetTodayHabitRecordDto(memberId!, today);
        const usecase = new GetTodayCheckedHabitIdsUsecase(new SbHabitRecordRepository());
        const checkedIds = await usecase.execute(dto);

        return NextResponse.json({ checkedIds });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}