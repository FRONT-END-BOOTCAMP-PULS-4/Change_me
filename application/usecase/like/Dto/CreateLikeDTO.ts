export class CreateLikeDTO {
    constructor(
        public messageId: number,
        public memberId: string
    ) {}
}