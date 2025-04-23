import { NextRequest, NextResponse } from "next/server";
import { TestHabitRecordDto } from "@/application/usecase/habit/dto/TestHabitRecordDto";
import { TestHabitRecordUsecase } from "@/application/usecase/habit/TestHabitRecordUsecase";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { TestAutoUpdateHabitStatusUsecase } from "@/application/usecase/habit/TestAutoUpdateHabitStatusUsecase";

export async function POST(req: NextRequest) {
    try {
        const { habitId, date } = await req.json();

        const dto = new TestHabitRecordDto(habitId, new Date(date));
        const recordRepo = new SbHabitRecordRepository();
        const habitRepo = new SbHabitRepository();
        const usecase = new TestHabitRecordUsecase(new SbHabitRecordRepository());
        const result = await usecase.execute(dto);

        const statusUsecase = new TestAutoUpdateHabitStatusUsecase(habitRepo, recordRepo);
        await statusUsecase.execute(habitId);

        return NextResponse.json({ status: result.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { habitId, date } = await req.json();

        const dto = new TestHabitRecordDto(habitId, new Date(date));
        const recordRepo = new SbHabitRecordRepository();
        const habitRepo = new SbHabitRepository();
        const usecase = new TestHabitRecordUsecase(new SbHabitRecordRepository());
        const result = await usecase.execute(dto);

        const statusUsecase = new TestAutoUpdateHabitStatusUsecase(habitRepo, recordRepo);
        await statusUsecase.execute(habitId);

        return NextResponse.json({ status: result.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}