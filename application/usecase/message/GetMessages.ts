export class GetMessages {
    constructor(private messageRepository: any) {}

    async execute() {
        try {
            const messages = await this.messageRepository.findAll();
            return messages;
        } catch (error) {
            throw new Error("Error retrieving messages: " + error.message);
        }
    }
}