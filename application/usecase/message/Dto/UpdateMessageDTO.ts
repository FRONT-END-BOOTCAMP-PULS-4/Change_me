export class UpdateMessageDTO {
    constructor(
        public id: number,
        public content?: string,
        public modifiedAt?: Date
    ) {}
}