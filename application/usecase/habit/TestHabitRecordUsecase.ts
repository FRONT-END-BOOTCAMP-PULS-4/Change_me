import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { TestHabitRecordDto } from "./dto/TestHabitRecordDto";
import { HabitRecord } from "@/domain/entities/HabitRecord";

export class TestHabitRecordUsecase {
    constructor(
        private readonly recordRepo: HabitRecordRepository,
        private readonly habitRepo: HabitRepository
    ) { }

    async execute(dto: TestHabitRecordDto): Promise<{ status: "created" | "deleted" }> {
        const record = new HabitRecord(dto.habitId, dto.date);
        const exists = await this.recordRepo.TestExists(record);

        let status: "created" | "deleted";
        if (exists) {
            await this.recordRepo.TestDelete(record);
            status = "deleted";
        } else {
            await this.recordRepo.TestSave(record);
            status = "created";
        }

        // 달성률에 따른 상태 업데이트
        const habit = await this.habitRepo.TestFindById(dto.habitId);
        if (!habit) throw new Error("습관을 찾을 수 없습니다");
        if (!habit.createdAt || !habit.finishedAt) {
            throw new Error("습관의 날짜 정보가 유효하지 않습니다.");
        }
        const start = new Date(habit.createdAt);
        const end = new Date(habit.finishedAt);
        const totalDays =
            Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const checkedCount = await this.recordRepo.TestCountByHabitId(dto.habitId);
        const rate = (checkedCount / totalDays) * 100;
        const newStatus = rate >= 80 ? 3 : 0;

        if (habit.status !== newStatus) {
            await this.habitRepo.TestUpdateStatus(dto.habitId, newStatus);
        }

        return { status };
    }
}