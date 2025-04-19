import { DeleteMessageUsecase } from "@/application/usecase/message/DeleteMessageUsecase";
import { UpdateMessageUsecase } from "@/application/usecase/message/UpdateMessageUsecase";
import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { SbMessageRepository } from "@/infra/repositories/supabase/SbMessageRepository";
import { getMemberIdFromToken } from "@/utils/auth";
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

        if (!body.content) {
            return NextResponse.json(
                {
                    message: "메시지 내용이 없습니다.",
                },
                { status: 400 },
            );
        }

        const messageRepository: MessageRepository = new SbMessageRepository();
        const updateMessageUsecase: UpdateMessageUsecase =
            new UpdateMessageUsecase(messageRepository);

        await updateMessageUsecase.execute({
            id: Number(id),
            memberId: memberId,
            content: body.content,
        });

        return NextResponse.json(
            {
                message: "메시지 수정 성공",
            },
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "메시지 수정 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}

export async function DELETE(request: Request, { params }: RequestParams) {
    try {
        const { id } = await params;

        const messageRepository: MessageRepository = new SbMessageRepository();
        const deleteMessageUsecase: DeleteMessageUsecase =
            new DeleteMessageUsecase(messageRepository);

        await deleteMessageUsecase.execute(Number(id));

        return NextResponse.json(
            {
                message: "메시지 삭제 성공",
            },
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "메시지 삭제 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
