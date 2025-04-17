import { Habitdto } from './HabitDto';

export class HabitListDto {
    habits: Habitdto[];
    totalCount: number;
    currentPage: number;
    totalPages: number;

    constructor(habits: Habitdto[], totalCount: number, currentPage: number, totalPages: number) {
        this.habits = habits;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }
}
