import { GetAdmincategoryListQueryDto } from "./../../../../application/usecase/category/dto/GetAdminCategoryListQueryDto";
import { GetAdminCategoryListUsecase } from "@/application/usecase/category/GetAdminCategoryListUsecase";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { NextResponse } from "next/server";
import { getMemberIdFromToken } from "@/utils/auth";
import { CreateCategoryUsecase } from "@/application/usecase/category/CreateCategoryUsecase";
import { CreateCategoryDto } from "@/application/usecase/category/dto/CreateCategoryDto";

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

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json(
                {
                    message: "카테고리 이름이 없습니다.",
                },
                { status: 400 },
            );
        }

        const memberId = await getMemberIdFromToken(
            request.headers.get("Authorization")!,
        );

        if (!memberId) {
            throw new Error();
        }

        const createCategoryDto = new CreateCategoryDto(body.name, memberId);

        const categoryRepository: CategoryRepository =
            new SbCategoryRepository();
        const createCategoryUsecase = new CreateCategoryUsecase(
            categoryRepository,
        );

        const newCategory =
            await createCategoryUsecase.execute(createCategoryDto);

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "카테고리 생성 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
