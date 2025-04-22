import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { MessageListDto } from "./dto/MessageListDto";
import { GetMessageListDto } from "./dto/GetMessageListDto";
import { MessageFilter } from "@/domain/repositories/filters/MessageFilter";
import { Message } from "@/domain/entities/Message";
import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { Member } from "@/domain/entities/Member";
import { MessageLikeRepository } from "@/domain/repositories/MessageLikeRepository";
import { MessageDto } from "./dto/MessageDto";

export class GetMessageListUsecase {
    private messageRepository: MessageRepository;
    private memberRepository: MemberRepository;
    private messageLikeRepository: MessageLikeRepository;

    constructor(
        messageRepository: MessageRepository,
        memberRepository: MemberRepository,
        messageLikeRepository: MessageLikeRepository,
    ) {
        this.messageRepository = messageRepository;
        this.memberRepository = memberRepository;
        this.messageLikeRepository = messageLikeRepository;
    }

    async execute(
        getMessageListDto: GetMessageListDto,
    ): Promise<MessageListDto> {
        try {
            // page setups
            const pageSize: number = 5; // number of messages per page
            const currentPage: number =
                getMessageListDto.queryString.currentPage || 1;
            const mine: boolean = getMessageListDto.queryString.mine || false; // default to false
            const memberId = getMessageListDto.memberId;
            const offset: number = (currentPage - 1) * pageSize;
            const limit: number = pageSize;

            // data query
            const filter = new MessageFilter(
                mine ? memberId : null,
                "createdAt",
                false, // default sorting order: latest first
                offset,
                limit,
            );

            const messages: Message[] =
                await this.messageRepository.findAll(filter);
            const totalCount: number =
                await this.messageRepository.count(filter);

            // convert Message to MessageDto
            const messageDtos: MessageDto[] = await Promise.all(
                messages.map(async (message) => {
                    let writer: Member | null =
                        await this.memberRepository.findById(message.memberId);
                    let likeCount: number =
                        await this.messageLikeRepository.count({
                            messageId: message.id,
                            memberId: null,
                        });
                    let isLiked: boolean =
                        (await this.messageLikeRepository.findAll({
                            memberId: getMessageListDto.memberId,
                            messageId: message.id,
                        })) !== null;

                    return {
                        id: message.id,
                        memberId: writer?.id || "Unknown",
                        writer: writer?.nickname || "Unknown",
                        imageUrl:
                            writer?.imageUrl ||
                            "@/public/images/ProfileCircle.png",
                        content: message.content,
                        createdAt: message.createdAt,
                        likeCount,
                        isLiked,
                        modifiedAt: message.modifiedAt,
                    };
                }),
            );

            const startPage =
                Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
            const endPage = Math.ceil(totalCount / pageSize);
            const pages = Array.from(
                { length: 5 }, // 5 pages to show
                (_, i) => i + startPage,
            ).filter((pageNumber) => pageNumber <= endPage);

            const messageListDto: MessageListDto = {
                messages: messageDtos,
                currentPage,
                pages,
                endPage,
            };

            return messageListDto;
        } catch (error) {
            console.error("Error retrieving messages:", error);
            throw new Error("Error retrieving messages.");
        }
    }
}
