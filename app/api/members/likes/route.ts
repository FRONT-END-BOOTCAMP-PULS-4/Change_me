import { CreateMessageLikeDto } from "@/application/usecase/message-like/dto/CreateMessageLikeDto";
import { CreateMessageLikeUsecase } from "@/application/usecase/message-like/CreateMessageLikeUsecase";
import { MessageLikeRepository } from "@/domain/repositories/MessageLikeRepository";
import { SbMessageLikeRepository } from "@/infra/repositories/supabase/SbMessageLikeRepository";
import { getMemberIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // body validation
        if (!body.messageId) {
            return NextResponse.json(
                {
                    error: "메시지 아이디는 필수입니다.",
                },
                { status: 400 },
            );
        }

        const memberId = await getMemberIdFromToken(
            request.headers.get("Authorization")!,
        );

        if (!memberId) {
            return NextResponse.json(
                {
                    error: "멤버 아이디를 찾을 수 없습니다.",
                },
                { status: 400 },
            );
        }

        const createMessageLikeDto = new CreateMessageLikeDto(
            body.messageId,
            memberId,
        );

        const messageLikeRepository: MessageLikeRepository =
            new SbMessageLikeRepository();
        const createMessageLikeUsecase: CreateMessageLikeUsecase =
            new CreateMessageLikeUsecase(messageLikeRepository);

        const newMessageLike =
            await createMessageLikeUsecase.execute(createMessageLikeDto);

        return NextResponse.json(newMessageLike, { status: 201 });
    } catch (error) {
        console.error("Error creating messageLikes:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "메시지 좋아요 생성 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
