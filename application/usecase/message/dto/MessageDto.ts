export class MessageDto {
    constructor(
        public id: number,
        public memberId: string,
        public writer: string,
        public imageUrl: string | null,
        public content: string,
        public createdAt: Date,
        public likeCount: number,
        public isLiked: boolean,
        public modifiedAt: Date | null, // can be null if message is not modified
    ) {}
}
