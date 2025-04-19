import { HabitDto } from "./HabitDto";

export class HabitListDto {
    habits: HabitDto[];
    totalCount: number;
    currentPage: number;
    totalPages: number;

    constructor(
        habits: HabitDto[], 
        totalCount: number, 
        currentPage: number, 
        totalPages: number
    ) {
        this.habits = habits;
        this.totalCount = totalCount;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }
}