import { GetCategoryListQueryDto } from "@/application/usecase/category/dto/GetCategoryListQueryDto";
import { GetCategoryListUseCase } from "@/application/usecase/category/GetCategoryListUsecase";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const popularParam = url.searchParams.get("popular") || undefined;

        const categoryRepository: CategoryRepository =
            new SbCategoryRepository();
        const getCategoryListUsecase = new GetCategoryListUseCase(
            categoryRepository,
        );

        const queryDto = new GetCategoryListQueryDto(popularParam === "true");
        const categories = await getCategoryListUsecase.execute(queryDto);

        return NextResponse.json(categories);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "카테고리 조회 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
