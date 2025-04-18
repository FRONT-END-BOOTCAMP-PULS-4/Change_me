export class Message {
    constructor(
        public id: number | null, // null only if message is created
        public memberId: string,
        public content: string,
        public createdAt: Date,
        public modifiedAt: Date | null,
    ) {}
}
