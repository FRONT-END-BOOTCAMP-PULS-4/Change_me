export class CreateMessageLikeDto {
    constructor(
        public messageId: number,
        public memberId: string,
    ) {}
}
