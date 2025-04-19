export class UpdateMessageDto {
    constructor(
        public id: number,
        public memberId: string,
        public content: string,
    ) {}
}
