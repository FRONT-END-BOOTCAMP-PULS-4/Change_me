import { MessageLikeRepository } from "@/domain/repositories/MessageLikeRepository";

export class DeleteMessageLikeUsecase {
    private messageLikeRepository: MessageLikeRepository;

    constructor(messageLikeRepository: MessageLikeRepository) {
        this.messageLikeRepository = messageLikeRepository;
    }

    async execute(messageId: number, memberId: string): Promise<void> {
        if (!messageId) {
            throw new Error("messageId is required");
        } else if (!memberId) {
            throw new Error("memberId is required");
        }

        await this.messageLikeRepository.delete(messageId, memberId);
    }
}
