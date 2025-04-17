export class CreateMemberLikeUsecase {
    constructor(
        public messageId: number,
        public memberId: string,
    ) {}

    async execute() {
        // Logic to create a like for a message by a member
        // This could involve calling a repository method to save the like in the database
    }
}
