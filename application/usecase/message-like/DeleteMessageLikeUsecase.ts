export class DeleteMemberLikeUsecase {
    constructor(
        public messageId: number,
        public memberId: string,
    ) {}

    async execute() {}
}
