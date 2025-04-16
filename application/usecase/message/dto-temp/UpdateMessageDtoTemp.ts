export class UpdateMessageDto {
    constructor(
        public id: number,
        public content?: string,
        public modifiedAt?: Date,
    ) {}
}
