export class HabitFilter {
    constructor(
        public memberId?: string,
        public categoryId?: number,
        public status?: number,
        public sortField?: string,
        public ascending?: boolean,
        public offset: number = 0,
        public limit: number = 10,
    ) {}
}
