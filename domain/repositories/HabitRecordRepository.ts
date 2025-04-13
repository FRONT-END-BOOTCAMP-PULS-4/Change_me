import { HabitRecord } from "../entities/HabitRecord";

export interface HabitRecordRepository {
    findAll(): Promise<HabitRecord[]>;
    findById(id: number): Promise<HabitRecord | null>;
    save(habitRecord: HabitRecord): Promise<HabitRecord>;
    update(habitRecord: HabitRecord): Promise<HabitRecord>;
    deleteById(id: number): Promise<void>;
}
