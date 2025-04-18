import { MessageLikeRepository } from "@/domain/repositories/MessageLikeRepository";
import { CreateMessageLikeDto } from "./dto/CreateMessageLikeDto";
import { MessageLike } from "@/domain/entities/MessageLike";

export class CreateMessageLikeUsecase {
    private messageLikeRepository: MessageLikeRepository;

    constructor(messageLikeRepository: MessageLikeRepository) {
        this.messageLikeRepository = messageLikeRepository;
    }

    async execute(
        createMessageLikeDto: CreateMessageLikeDto,
    ): Promise<MessageLike> {
        const messageLike: MessageLike = new MessageLike(
            createMessageLikeDto.messageId,
            createMessageLikeDto.memberId,
        );

        const newMessageLike =
            await this.messageLikeRepository.save(messageLike);
        return newMessageLike;
    }
}
