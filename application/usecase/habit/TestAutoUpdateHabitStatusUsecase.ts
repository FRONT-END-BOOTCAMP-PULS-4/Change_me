import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";

export class TestAutoUpdateHabitStatusUsecase {
    constructor(
        private readonly habitRepo: HabitRepository,
        private readonly recordRepo: HabitRecordRepository
    ) { }

    async execute(habitId: number): Promise<void> {
        const habit = await this.habitRepo.TestFindById(habitId);
        if (!habit) throw new Error("습관을 찾을 수 없습니다");

        const start = new Date(habit.createdAt);
        const end = new Date(habit.finishedAt);
        const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const checkedCount = await this.recordRepo.TestCountByHabitId(habitId);
        const rate = (checkedCount / totalDays) * 100;

        const newStatus = rate >= 80 ? 3 : 0;

        if (habit.status !== newStatus) {
            await this.habitRepo.TestUpdateStatus(habitId, newStatus);
        }
    }
}