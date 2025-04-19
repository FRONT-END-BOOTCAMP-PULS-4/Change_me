import { MessageRepository } from "@/domain/repositories/MessageRepository";

export class DeleteMessageUsecase {
    private messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(id: number): Promise<void> {
        if (id) {
            throw new Error("id is required");
        }

        await this.messageRepository.deleteById(id);
    }
}
