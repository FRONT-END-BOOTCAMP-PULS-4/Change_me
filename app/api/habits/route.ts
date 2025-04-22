import { AnonHabitListQueryDto } from "@/application/usecase/habit/dto/AnonHabitListQueryDto";
import { GetAnonHabitListUsecase } from "./../../../application/usecase/habit/GetAnonHabitListUsecase";
import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const categoryId = url.searchParams.get("categoryId") || undefined;

        const habitRepository: HabitRepository = new SbHabitRepository();
        const getAnonHabitListUsecase = new GetAnonHabitListUsecase(
            habitRepository,
        );

        const queryDto = new AnonHabitListQueryDto(
            categoryId ? Number(categoryId) : undefined,
        );

        const result = await getAnonHabitListUsecase.execute(queryDto);

        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "모두의 습관 조회 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
