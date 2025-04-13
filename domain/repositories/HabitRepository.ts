import { Habit } from "../entities/Habit";

export interface HabitRepository {
    findAll(): Promise<Habit[]>;
    findById(id: number): Promise<Habit | null>;
    save(category: Habit): Promise<Habit>;
    update(category: Habit): Promise<Habit>;
    deleteById(id: number): Promise<void>;
}
