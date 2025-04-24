import { NextRequest, NextResponse } from "next/server";
import { HabitRecordDto } from "@/application/usecase/habit/dto/HabitRecordDto";
import { HabitRecordUsecase } from "@/application/usecase/habit/HabitRecordUsecase";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";

export async function POST(req: NextRequest) {
    try {
        const { habitId, date } = await req.json();

        const dto = new HabitRecordDto(habitId, new Date(date));
        const recordRepo = new SbHabitRecordRepository();
        const habitRepo = new SbHabitRepository();
        const usecase = new HabitRecordUsecase(recordRepo, habitRepo);
        const result = await usecase.execute(dto);

        return NextResponse.json({ status: result.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { habitId, date } = await req.json();

        const dto = new HabitRecordDto(habitId, new Date(date));
        const recordRepo = new SbHabitRecordRepository();
        const habitRepo = new SbHabitRepository();
        const usecase = new HabitRecordUsecase(recordRepo, habitRepo);
        const result = await usecase.execute(dto);

        return NextResponse.json({ status: result.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}