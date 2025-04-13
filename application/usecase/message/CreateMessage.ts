export class CreateMessage {
    constructor(
        public memberId: string,
        public content: string,
        public createdAt: Date = new Date()
    ) {}

    execute() {
        // Logic to create a new message
        // This could involve calling a repository method to save the message to a database
    }
}