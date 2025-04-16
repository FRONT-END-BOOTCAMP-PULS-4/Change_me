import { GetCategoryListQueryDto } from "@/application/usecase/category/dto/GetCategoryListQueryDto";
import { GetCategories } from "@/application/usecase/category/GetCategoryListUsecase";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const popularParam = url.searchParams.get("popular") || undefined;

        const categoryRepository: CategoryRepository =
            new SbCategoryRepository();
        const getCategoryListUsecase = new GetCategories(categoryRepository);

        const queryDto = new GetCategoryListQueryDto(popularParam === "true");
        const categories = await getCategoryListUsecase.execute(queryDto);

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { message: "카테고리 조회 실패" },
            { status: 400 },
        );
    }
}
