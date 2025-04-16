import {HabitRepository} from '@/domain/repositories/HabitRepository';
import {Habit} from '@/domain/entities/Habit';
import {HabitFilter} from '@/domain/repositories/filters/HabitFilter';
export class GetExploreHabits {
    constructor(private habitRepository: HabitRepository) {}

    async execute(): Promise<Habit[]> {
        // Logic to retrieve habits for exploration
        return await this.habitRepository.findAll(); // Example implementation
    }
}