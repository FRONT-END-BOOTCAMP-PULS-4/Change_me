export class GetMessageListQueryDto {
    constructor(
        public currentPage?: number, // current page number
        public mine?: boolean,
    ) {}
}
