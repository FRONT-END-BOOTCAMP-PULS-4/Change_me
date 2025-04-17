import { SbCategoryRepository } from "@/infra/repositories/supabase/SbCategoryRepository";
import { UpdateCategoryUsecase } from "./../../../../../application/usecase/category/UpdateCategoryUsecase";
import { NextResponse } from "next/server";

type RequestParams = {
    params: {
        id: string;
    };
};

export async function PATCH(request: Request, { params }: RequestParams) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!body.name) {
            return NextResponse.json(
                {
                    message: "카테고리 이름이 없습니다.",
                },
                { status: 400 },
            );
        }

        const updateCategoryUsecase = new UpdateCategoryUsecase(
            new SbCategoryRepository(),
        );

        await updateCategoryUsecase.execute({
            id: Number(id),
            name: body.name,
        });

        return NextResponse.json({
            message: "카테고리 수정 성공",
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "카테고리 수정 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
