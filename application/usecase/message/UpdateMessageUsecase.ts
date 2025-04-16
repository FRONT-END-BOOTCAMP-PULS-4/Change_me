export class UpdateMessageUsecase {
    constructor(
        public id: number,
        public content: string,
        public modifiedAt: Date,
    ) {}

    async execute() {
        // Logic to update the message in the database
        // This would typically involve calling a repository method
        // to perform the update operation.
    }
}
