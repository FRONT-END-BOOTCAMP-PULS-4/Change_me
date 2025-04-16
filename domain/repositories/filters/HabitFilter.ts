export class HabitFilter {
    constructor(
        public memberId?: string,
        public categoryId?: number,
        public status?: number,
        public sortField?: string, // 나중에 시간 되면 정렬 관련 기능 추가
        public ascending?: boolean, // 나중에 시간 되면 정렬 관련 기능 추가
        public offset: number = 0,
        public limit: number = 10,
    ) {}
}
