import { DeleteMessageLikeUsecase } from "@/application/usecase/message-like/DeleteMessageLikeUsecase";
import { CreateMessageLikeDto } from "@/application/usecase/message-like/dto/CreateMessageLikeDto";
import { MessageLikeRepository } from "@/domain/repositories/MessageLikeRepository";
import { SbMessageLikeRepository } from "@/infra/repositories/supabase/SbMessageLikeRepository";
import { getMemberIdFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

type RequestParams = {
    params: {
        messageId: string;
    };
};

export async function DELETE(request: Request, { params }: RequestParams) {
    try {
        const { messageId } = await params;

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

        const messageLikeRepository: MessageLikeRepository =
            new SbMessageLikeRepository();
        const deleteMessageLikeUsecase: DeleteMessageLikeUsecase =
            new DeleteMessageLikeUsecase(messageLikeRepository);

        await deleteMessageLikeUsecase.execute(Number(messageId), memberId);

        return NextResponse.json(
            {
                message: "메시지 좋아요 삭제 성공",
            },
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "메시지 좋아요 삭제 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
