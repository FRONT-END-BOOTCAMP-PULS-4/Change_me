import { GetMessageListUsecase } from "@/application/usecase/message/GetMessageListUsecase";
import { SbMessageRepository } from "@/infra/repositories/supabase/SbMessageRepository";
import { SbMemberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { SbMessageLikeRepository } from "@/infra/repositories/supabase/SbMessageLikeRepository";
import { Message } from "@/domain/entities/Message";

import { NextResponse } from "next/server";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { MessageLikeRepository } from "@/domain/repositories/MessageLikeRepository";
import { GetMessageListQueryDto } from "@/application/usecase/message/dto/GetMessageListQueryDto";

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
        const messageLikeRepository: MessageLikeRepository =
            new SbMessageLikeRepository();

        const getMessageListUsecase = new GetMessageListUsecase(
            messageRepository,
            memberRepository,
            messageLikeRepository,
        );

        // set up query DTO
        const queryDto = new GetMessageListQueryDto(
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
