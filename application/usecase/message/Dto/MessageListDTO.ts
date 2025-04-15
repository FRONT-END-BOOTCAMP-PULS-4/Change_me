import { MessageDTO } from "./MessageDTO";

export class MessageListDTO {
    constructor(
        public messages: MessageDTO[],
        public totalCount: number, // total number of messages
        public endPage: number, // last page number
        public pages: number[] // array of page numbers to show in pagination
    ) {}
}
