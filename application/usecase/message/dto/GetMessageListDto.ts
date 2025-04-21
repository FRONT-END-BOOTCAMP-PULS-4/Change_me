export class GetMessageListDto {
    constructor(
        public queryString: {
            currentPage: number; // current page number
            mine: boolean;
        },
        public memberId: string,
    ) {}
}
