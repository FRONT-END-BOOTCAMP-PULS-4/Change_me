import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { TestHabitRecordDto } from "./dto/TestHabitRecordDto";
import { HabitRecord } from "@/domain/entities/HabitRecord";

export class TestHabitRecordUsecase {
    constructor(private readonly repo: HabitRecordRepository) { }

    async execute(dto: TestHabitRecordDto): Promise<{ status: "created" | "deleted" }> {
        const record = new HabitRecord(dto.habitId, dto.date);
        const exists = await this.repo.TestExists(record);

        if (exists) {
            await this.repo.TestDelete(record);
            return { status: "deleted" };
        } else {
            await this.repo.TestSave(record);
            return { status: "created" };
        }
    }
}