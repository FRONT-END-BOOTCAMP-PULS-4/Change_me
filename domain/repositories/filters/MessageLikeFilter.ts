export class MessageLikeFilter {
    constructor(
        public messageId?: number,
        public memberId?: string,
        public includeAll?: boolean
    ) {}
}
