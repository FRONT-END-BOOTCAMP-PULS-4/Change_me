import { CreateHabitDto } from "./dto/CreateHabitDto";
import { Habit } from "@/domain/entities/Habit";
import { HabitRepository } from "@/domain/repositories/HabitRepository";

export class CreateHabitUsecase {
    constructor(private habitRepo: HabitRepository) { }

    async execute(dto: CreateHabitDto): Promise<void> {
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

        await this.habitRepo.create(habit);
    }
}