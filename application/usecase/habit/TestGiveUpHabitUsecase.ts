import { HabitRepository } from "@/domain/repositories/HabitRepository";

export class TestGiveUpHabitUsecase {
    constructor(private readonly repo: HabitRepository) { }

    async execute(habitId: number): Promise<void> {
        await this.repo.TestGiveUpById(habitId);
    }
}