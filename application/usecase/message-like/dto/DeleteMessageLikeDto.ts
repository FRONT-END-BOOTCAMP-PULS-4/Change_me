export class DeleteMessageLikeDto {
    constructor(
        public messageId: number,
        public memberId: string,
    ) {}
}
