import { Habit } from "../entities/Habit";
import { HabitFilter } from "./filters/HabitFilter";

export interface HabitRepository {
    findAll(filter?: HabitFilter): Promise<Habit[]>;
    findById(id: number): Promise<Habit | null>;
    save(Habit: Habit): Promise<Habit>;
    update(Habit: Habit): Promise<Habit>;
    deleteById(id: number): Promise<void>;
}
