export class GetExploreHabitsDTO {
    constructor(
        public categoryId?: number,
        public memberId?: string,
        public limit: number = 10,
        public offset: number = 0
    ) {}
}