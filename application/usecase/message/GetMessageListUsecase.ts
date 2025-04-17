import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { MessageListDto } from "./dto/MessageListDto";
import { GetMessageListQueryDto } from "./dto/GetMessageListQueryDto";
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

    async execute(queryDto: GetMessageListQueryDto): Promise<MessageListDto> {
        try {
            // page setups
            const pageSize: number = 5; // number of messages per page
            const currentPage: number = queryDto.currentPage || 1;
            const mine: boolean = queryDto.mine || false; // default to false

            const offset: number = (currentPage - 1) * pageSize;
            const limit: number = pageSize;

            const memberId: string = "temp"; // TODO: using JWT token to get memberId

            // data query
            const filter = new MessageFilter(
                memberId,
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
                    let member: Member | null =
                        await this.memberRepository.findById(message.memberId);
                    let likeCount: number =
                        await this.messageLikeRepository.count({
                            messageId: message.id,
                        });
                    let isLiked: boolean =
                        (await this.messageLikeRepository.findAll({
                            memberId: member?.id,
                            messageId: message.id,
                        })) !== null;

                    return {
                        id: message.id,
                        writer: member?.name || "Unknown",
                        profileUrl:
                            member?.imageUrl ||
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
                totalCount,
                endPage,
                pages,
            };

            return messageListDto;
        } catch (error) {
            console.error("Error retrieving messages:", error);
            throw new Error("Error retrieving messages.");
        }
    }
}
