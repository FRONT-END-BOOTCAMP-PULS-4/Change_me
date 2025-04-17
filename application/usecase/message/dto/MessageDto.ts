export class MessageDto {
    constructor(
        public id: number,
        public writer: string,
        public profileUrl: string,
        public content: string,
        public createdAt: Date,
        public likeCount: number,
        public isLiked: boolean,
        public modifiedAt: Date | null, // can be null if message is not modified
    ) {}
}
