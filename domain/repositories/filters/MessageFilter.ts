export class MessageFilter {
    constructor(
        public memberId?: string,
        public includeAll?: boolean,
        public sortField?: string,
        public ascending?: boolean,
        public offset: number = 0,
        public limit: number = 5,
    ) {}
}
