export class GetMessagesDTO {
    constructor(
        public page: number,
        public limit: number,
        public filter?: string,
        public sortBy?: string,
        public sortOrder?: 'asc' | 'desc'
    ) {}
}