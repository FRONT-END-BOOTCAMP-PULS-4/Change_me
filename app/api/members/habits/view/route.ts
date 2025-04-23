import { NextResponse } from "next/server";
import { getMemberIdFromToken } from "@/utils/auth";
import { GetHabitListUsecase } from "@/application/usecase/habit/GetHabitListUsecase";
import { ViewQueryDto } from "@/application/usecase/habit/dto/ViewQueryDto";
import { HabitRecordDto } from "@/application/usecase/habit/dto/HabitRecordDto";
import { SbHabitRepository } from "@/infra/repositories/supabase/SbHabitRepository";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { Habit } from "@/domain/entities/Habit";

export async function GET(request: Request) {
    try {
        // 요청의 URL에서 쿼리 파라미터 추출
        const url = new URL(request.url);
        const currentPage = url.searchParams.get("page")
            ? parseInt(url.searchParams.get("page")!)
            : 1;
        const categoryId = url.searchParams.get("categoryId")
            ? parseInt(url.searchParams.get("categoryId")!)
            : undefined;
        const status = url.searchParams.get("status")
            ? parseInt(url.searchParams.get("status")!)
            : undefined;

        // 인증 토큰에서 사용자 ID 추출
        const authHeader = request.headers.get("Authorization") || "";
        const memberId = await getMemberIdFromToken(authHeader);

        if (!memberId) {
            return NextResponse.json(
                { error: "인증되지 않은 사용자입니다." },
                { status: 401 },
            );
        }

        // 비즈니스 로직 실행을 위한 DTO 생성
        const viewQueryDto = new ViewQueryDto(
            currentPage,
            memberId,
            categoryId,
            status,
        );

        // 리포지토리와 유스케이스 인스턴스 생성
        const sbHabitRepository = new SbHabitRepository();
        const sbHabitRecordRepository = new SbHabitRecordRepository();
        const sbCategoryRepository = new SbCategoryRepository();
        const getHabitListUsecase = new GetHabitListUsecase(
            sbHabitRepository,
            sbHabitRecordRepository,
            sbCategoryRepository,
        );

        // 유스케이스 실행 및 결과 반환
        const result = await getHabitListUsecase.execute(viewQueryDto);
        return NextResponse.json(result);
    } catch (error) {
        console.error("습관 목록 조회 중 오류 발생:", error);
        return NextResponse.json(
            { error: "습관 목록 조회에 실패했습니다." },
            { status: 500 },
        );
    }
}
