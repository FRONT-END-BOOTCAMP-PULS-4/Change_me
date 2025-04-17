import { MessageDto } from "./MessageDto";

export class MessageListDto {
    constructor(
        public messages: MessageDto[],
        public totalCount: number, // total number of messages
        public endPage: number, // last page number
        public pages: number[], // array of page numbers to show in pagination
    ) {}
}
