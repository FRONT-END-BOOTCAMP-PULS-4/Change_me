import { TestCreateHabitDto } from "./dto/TestCreateHabitDto";
import { Habit } from "@/domain/entities/Habit";
import { HabitRepository } from "@/domain/repositories/HabitRepository";

export class TestCreateHabitUsecase {
    constructor(private habitRepo: HabitRepository) { }

    async execute(dto: TestCreateHabitDto): Promise<void> {
        const habit = new Habit(
            0, // Supabase에서 auto increment
            dto.categoryId,
            dto.memberId,
            dto.name,
            dto.description,
            new Date(), // createdAt
            new Date(dto.finishedAt),
            null,
            0 // status: 진행중
        );

        await this.habitRepo.TestCreate(habit);
    }
}