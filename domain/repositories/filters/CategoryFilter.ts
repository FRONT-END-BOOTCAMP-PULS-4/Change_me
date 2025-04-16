export class CategoryFilter {
    constructor(
        public popular?: boolean,
        public offset?: number,
        public limit?: number,
    ) {}
}
