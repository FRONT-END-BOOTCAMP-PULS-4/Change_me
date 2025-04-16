import { GetAdmincategoryListQueryDto } from "./../../../../application/usecase/category/dto/GetAdminCategoryListQueryDto";
import { GetAdminCategoryListUsecase } from "@/application/usecase/category/GetAdminCategoryListUsecase";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const currentPageParam = url.searchParams.get("currentPage") || 1;

        const categoryRepository: CategoryRepository =
            new SbCategoryRepository();
        const getAdminCategoryListUsecase = new GetAdminCategoryListUsecase(
            categoryRepository,
        );

        const queryDto = new GetAdmincategoryListQueryDto(
            Number(currentPageParam),
        );
        const categories = await getAdminCategoryListUsecase.execute(queryDto);

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { message: "카테고리 조회 실패" },
            { status: 400 },
        );
    }
}
