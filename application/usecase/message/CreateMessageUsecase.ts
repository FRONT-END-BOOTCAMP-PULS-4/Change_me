import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { CreateMessageDto } from "./dto/CreateMessageDto";
import { Message } from "@/domain/entities/Message";

export class CreateMessageUsecase {
    private messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(createMessageDto: CreateMessageDto): Promise<Message> {
        const message: Message = new Message(
            -1, // ignore it, message id is auto-incremented by supabase.
            createMessageDto.memberId,
            createMessageDto.content,
            new Date(),
            null,
        );

        const newMessage = await this.messageRepository.save(message);
        return newMessage;
    }
}
