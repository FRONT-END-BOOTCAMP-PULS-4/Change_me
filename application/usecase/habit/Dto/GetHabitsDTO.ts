export class GetHabitsDTO {
    constructor(
        public memberId?: string,
        public categoryId?: number,
        public status?: number,
        public offset: number = 0,
        public limit: number = 10
    ) {}
}