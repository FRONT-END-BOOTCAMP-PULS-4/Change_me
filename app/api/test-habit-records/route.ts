import { NextRequest, NextResponse } from "next/server";
import { getMemberIdFromToken } from "@/utils/auth";
import { TestHabitRecordDto } from "@/application/usecase/habit/dto/TestHabitRecordDto";
import { TestHabitRecordUsecase } from "@/application/usecase/habit/TestHabitRecordUsecase";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";

export async function POST(req: NextRequest) {
    try {
        const { habitId, date } = await req.json();

        const dto = new TestHabitRecordDto(habitId, new Date(date));
        const usecase = new TestHabitRecordUsecase(new SbHabitRecordRepository());
        const result = await usecase.execute(dto);

        return NextResponse.json({ status: result.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { habitId, date } = await req.json();

        const dto = new TestHabitRecordDto(habitId, new Date(date));
        const usecase = new TestHabitRecordUsecase(new SbHabitRecordRepository());
        const result = await usecase.execute(dto);

        return NextResponse.json({ status: result.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}