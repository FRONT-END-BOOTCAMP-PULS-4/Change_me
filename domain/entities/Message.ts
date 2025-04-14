export class Message {
    constructor(
        public id: number,
        public memberId: string,
        public content: string,
        public createdAt: Date,
        public modifiedAt: Date
    ) {}
}
