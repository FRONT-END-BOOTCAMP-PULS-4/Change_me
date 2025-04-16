import {HabitRepository} from '@/domain/repositories/HabitRepository';
import {Habit} from '@/domain/entities/Habit';
import {HabitFilter} from '@/domain/repositories/filters/HabitFilter';

export class GetHabitById {
    constructor(private habitRepository: HabitRepository) {}

    async execute(habitId: number): Promise<Habit | null> {
        return await this.habitRepository.findById(habitId);
    }
}