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

    create(habit: Habit): Promise<void>;
    findOngoingByMemberId(memberId: string): Promise<TestHabit[]>;
    deleteById2(habitId: number): Promise<void>;
    giveUpById(habitId: number): Promise<void>;
    update2(
        id: number,
        memberId: string,
        categoryId: number,
        name: string,
        description: string,
        finishedAt: string
    ): Promise<void>;
    findById2(id: number): Promise<Habit>;
    updateStatus(habitId: number, status: number): Promise<void>;
    TestFindSuccessByMemberId(memberId: string): Promise<TestHabit[]>;
    TestFindGiveupByMemberId(memberId: string): Promise<TestHabit[]>;
    TestFindFailByMemberId(memberId: string): Promise<TestHabit[]>;
}
