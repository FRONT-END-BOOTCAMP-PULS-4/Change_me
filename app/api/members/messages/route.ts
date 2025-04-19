import { GetMessageListUsecase } from "@/application/usecase/message/GetMessageListUsecase";
import { SbMessageRepository } from "@/infra/repositories/supabase/SbMessageRepository";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

import { NextResponse } from "next/server";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { GetMessageListDto } from "@/application/usecase/message/dto/GetMessageListDto";
import { getMemberIdFromToken } from "@/utils/auth";
import { CreateMessageDto } from "@/application/usecase/message/dto/CreateMessageDto";
import { CreateMessageUsecase } from "@/application/usecase/message/CreateMessageUsecase";

export async function GET(request: Request) {
    try {
        // get query parameters from URL
        const url = new URL(request.url);
        const currentPageParam =
            url.searchParams.get("currentPage") || undefined;
        const mineParam = url.searchParams.get("mine") || undefined;

        // set up usecase
        const messageRepository: MessageRepository = new SbMessageRepository();
        const memberRepository: MemberRepository = new SbMemberRepository();
        const messageLikeRepository: MessageRepository =
            new SbMessageRepository();

        const getMessageListUsecase = new GetMessageListUsecase(
            messageRepository,
            memberRepository,
            messageLikeRepository,
        );

        // set up query Dto
        const queryDto = new GetMessageListDto(
            Number(currentPageParam),
            mineParam === "true",
        );

        const messages: MessageListDto =
            await getMessageListUsecase.execute(queryDto);

        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // body validation
        if (!body.content) {
            return NextResponse.json(
                {
                    error: "댓글의 내용은 필수입니다.",
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

        const createMessageLikeDto = new CreateMessageDto(
            memberId,
            body.content,
        );

        const messageRepository: MessageRepository = new SbMessageRepository();
        const createMessageUsecase: CreateMessageUsecase =
            new CreateMessageUsecase(messageRepository);

        const newMessage =
            await createMessageUsecase.execute(createMessageLikeDto);

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error("Error creating messageLikes:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message || "메시지 생성 실패" },
                { status: 400 },
            );
        }
        return NextResponse.json(
            { message: "알 수 없는 오류 발생" },
            { status: 500 },
        );
    }
}
