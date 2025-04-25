import { HabitDto } from "./HabitDto";

export class HabitListDto {
    constructor(
        public habits: HabitDto[],
        public endPage: number,
        public currentPage: number,
        public pages: number[],
    ) {}
}
