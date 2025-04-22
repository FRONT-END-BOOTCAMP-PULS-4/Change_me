import { Habit } from "../entities/Habit";
import { HabitMember } from "../entities/HabitMember";
import { TestHabit } from "../entities/TestHabit";
import { HabitFilter } from "./filters/HabitFilter";

export interface HabitRepository {
    count(filter?: HabitFilter): Promise<number>;
    findAll(filter?: HabitFilter): Promise<HabitMember[]>;
    findById(id: number): Promise<Habit | null>;
    save(Habit: Habit): Promise<Habit>;
    update(Habit: Habit): Promise<Habit>;
    deleteById(id: number): Promise<void>;

    TestCreate(habit: Habit): Promise<void>;
    TestFindOngoingByMemberId(memberId: string): Promise<TestHabit[]>;
    TestDeleteById(habitId: number): Promise<void>;
    TestGiveUpById(habitId: number): Promise<void>;
}
