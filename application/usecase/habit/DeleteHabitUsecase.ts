import { HabitRepository } from "@/domain/repositories/HabitRepository";


export class DeleteHabitUsecase {
    constructor(private readonly repo: HabitRepository) { }

    async execute(habitId: number): Promise<void> {
        await this.repo.deleteById2(habitId);
    }
}