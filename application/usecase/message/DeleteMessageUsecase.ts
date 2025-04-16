export class DeleteMessageUsecase {
    constructor(private messageId: number) {}

    async execute() {
        // Logic to delete the message using the messageId
        // This could involve calling a repository method to remove the message from the database
    }
}
