import { NextRequest, NextResponse } from "next/server";
import { CreateHabitDto } from "@/application/usecase/habit/dto/CreateHabitDto";
import { CreateHabitUsecase } from "@/application/usecase/habit/CreateHabitUsecase";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { getMemberIdFromToken } from "@/utils/auth";
import { GetOngoingHabitsUsecase } from "@/application/usecase/habit/GetOngoingHabitsUsecase";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        const memberId = await getMemberIdFromToken(authHeader!);
        const habitRepo = new SbHabitRepository();
        const recordRepo = new SbHabitRecordRepository();
        const usecase = new GetOngoingHabitsUsecase(habitRepo, recordRepo);
        const habits = await usecase.execute(memberId!);

        return NextResponse.json({ habits });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        const memberId = await getMemberIdFromToken(authHeader!);
        const { categoryId, name, description, finishedAt } = await req.json();
        const dto = new CreateHabitDto(
            memberId!,
            categoryId,
            name,
            description,
            finishedAt,
        );
        const repo = new SbHabitRepository();
        const usecase = new CreateHabitUsecase(repo);
        await usecase.execute(dto);

        return NextResponse.json(
            { message: "습관 등록 완료" },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
