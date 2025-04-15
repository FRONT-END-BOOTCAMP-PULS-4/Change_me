import { MessageDTO } from "./MessageDTO";

export class MessageListDTO {
    constructor(
        public messages: MessageDTO[],
        public totalCount: number,
        public endPage: number,
        public pages: number[]
    ) {}
}
