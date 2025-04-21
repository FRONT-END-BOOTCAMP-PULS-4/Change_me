import { HabitRepository } from "@/domain/repositories/HabitRepository";


export class TestDeleteHabitUsecase {
    constructor(private readonly repo: HabitRepository) { }

    async execute(habitId: number): Promise<void> {
        await this.repo.TestDeleteById(habitId);
    }
}