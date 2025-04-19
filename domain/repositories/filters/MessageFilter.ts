export class MessageFilter {
    constructor(
        public memberId: string | null,
        public sortField?: string, // to support multiple sorting options later
        public ascending?: boolean,
        public offset: number = 0,
        public limit: number = 5,
    ) {}
}
