export class MessageFilter {
    constructor(
        public memberId?: string,
        public sortField?: string,
        public ascending?: boolean,
        public offset: number = 0,
        public limit: number = 5
    ) {}
}
