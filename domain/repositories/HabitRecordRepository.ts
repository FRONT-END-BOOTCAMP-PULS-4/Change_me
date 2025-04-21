import { HabitRecord } from "../entities/HabitRecord";
import { HabitRecordFilter } from "./filters/HabitRecordFilter";

export interface HabitRecordRepository {
    findAll(filter?: HabitRecordFilter): Promise<HabitRecord[]>;
    findById(id: number): Promise<HabitRecord | null>;
    save(habitRecord: HabitRecord): Promise<HabitRecord>;
    update(habitRecord: HabitRecord): Promise<HabitRecord>;
    deleteById(id: number): Promise<void>;

    TestExists(record: HabitRecord): Promise<boolean>;
    TestSave(record: HabitRecord): Promise<void>;
    TestDelete(record: HabitRecord): Promise<void>;
    TestGetTodayCheckedHabitIds(memberId: string, date: Date): Promise<number[]>;
}
