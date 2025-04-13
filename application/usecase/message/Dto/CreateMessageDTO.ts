export class CreateMessageDTO {
    constructor(
        public memberId: string,
        public content: string,
        public createdAt: Date
    ) {}
}