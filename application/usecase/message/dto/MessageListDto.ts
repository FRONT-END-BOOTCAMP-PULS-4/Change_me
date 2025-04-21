import { MessageDto } from "./MessageDto";

export class MessageListDto {
    constructor(
        public messages: MessageDto[],
        public currentPage: number, // current page number
        public pages: number[], // array of page numbers to show in pagination
        public endPage: number, // last page number
    ) {}
}
