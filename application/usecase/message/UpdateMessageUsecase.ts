import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { UpdateMessageDto } from "./dto/UpdateMessageDto";
import { Message } from "@/domain/entities/Message";

export class UpdateMessageUsecase {
    private messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    async execute(updateMessageDto: UpdateMessageDto): Promise<Message> {
        const message: Message = new Message(
            updateMessageDto.id,
            updateMessageDto.memberId,
            updateMessageDto.content,
            new Date(),
            new Date(),
        );

        const newMessage = this.messageRepository.update(message);
        return newMessage;
    }
}
