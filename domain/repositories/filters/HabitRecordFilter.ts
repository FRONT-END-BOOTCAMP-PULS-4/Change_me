export class HabitRecordFilter {
    constructor(
        public habitId?: number,
        public includeAll?: boolean,
        public sortField?: string,
        public ascending?: boolean,
        public offset: number = 0,
        public limit: number = 10,
    ) {}
}
