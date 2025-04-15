export class MessageDTO {
    constructor(
        public memberName: string,
        public memberImage: string,
        public content: string,
        public createdAt: Date,
        public countLike: number,
        public isLiked: boolean,
        public modifiedAt?: Date // can be null if message is not modified
    ) {}
}
