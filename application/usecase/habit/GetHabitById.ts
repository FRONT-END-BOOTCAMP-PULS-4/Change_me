export class GetHabitById {
    constructor(private habitRepository: HabitRepository) {}

    async execute(habitId: number): Promise<Habit | null> {
        return await this.habitRepository.findById(habitId);
    }
}