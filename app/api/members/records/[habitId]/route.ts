import { GetRecordDto } from "@/application/usecase/record/dto/GetRecordDto";
import { RecordDto } from "@/application/usecase/record/dto/RecordDto";
import { GetRecordUsecase } from "@/application/usecase/record/GetRecordUsecase";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { SbHabitRecordRepository } from "@/infra/repositories/supabase/SbHabitRecordRepository";
import { getMemberIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

type RequestParams = {
    params: {
        id: string;
    };
};

export async function GET(request: Request, { params }: RequestParams) {
    try {
        const memberId = await getMemberIdFromToken(
            request.headers.get("Authorization")!,
        );
        console.log(memberId);

        if (!memberId) {
            return NextResponse.json(
                {
                    error: "멤버 아이디를 찾을 수 없습니다.",
                },
                { status: 400 },
            );
        }

        const url = new URL(request.url);

        // set up usecase
        const habitRecordRepository: HabitRecordRepository =
            new SbHabitRecordRepository();

        const getRecordUsecase = new GetRecordUsecase(habitRecordRepository);

        // set up query Dto
        const getRecordDto: GetRecordDto = new GetRecordDto(Number(params.id));

        const recordDto: RecordDto =
            await getRecordUsecase.execute(getRecordDto);

        return NextResponse.json(recordDto);
    } catch (error) {
        console.error("Error fetching habit records:", error);
        return NextResponse.json(
            { error: "Failed to fetch habit records" },
            { status: 500 },
        );
    }
}
