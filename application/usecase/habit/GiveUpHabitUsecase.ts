import { HabitRepository } from "@/domain/repositories/HabitRepository";

export class GiveUpHabitUsecase {
    constructor(private readonly repo: HabitRepository) { }

    async execute(habitId: number): Promise<void> {
        await this.repo.giveUpById(habitId);
    }
}