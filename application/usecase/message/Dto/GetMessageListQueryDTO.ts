export class GetMessageListQueryDTO {
    constructor(
        public currentPage?: number, // current page number
        public mine?: boolean
    ) {}
}
