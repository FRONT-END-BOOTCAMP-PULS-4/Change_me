export class CategoryFilter {
    constructor(
        public name?: string,
        public includeAll?: boolean,
        public sortField?: string,
        public ascending?: boolean,
        public offset: number = 0,
        public limit: number = 10,
        public includeHabit: boolean = false
    ) {}
}
