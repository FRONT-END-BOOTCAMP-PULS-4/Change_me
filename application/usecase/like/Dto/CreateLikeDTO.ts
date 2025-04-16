export class CreateLikeDto {
    constructor(
        public messageId: number,
        public memberId: string,
    ) {}
}
