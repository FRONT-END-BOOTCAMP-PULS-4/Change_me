export class CreateMessageDto {
    constructor(
        public memberId: string,
        public content: string,
        public createdAt: Date,
    ) {}
}
