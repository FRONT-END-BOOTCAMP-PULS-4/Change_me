import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { TestGetTodayHabitRecordDto } from "./dto/TestGetTodayHabitRecordDto";

export class TestGetTodayCheckedHabitIdsUsecase {
    constructor(private readonly repo: HabitRecordRepository) { }

    async execute(dto: TestGetTodayHabitRecordDto): Promise<number[]> {
        return await this.repo.TestGetTodayCheckedHabitIds(dto.memberId, dto.date);
    }
}