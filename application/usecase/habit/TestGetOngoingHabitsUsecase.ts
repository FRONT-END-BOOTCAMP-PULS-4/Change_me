import { TestHabitProgressDto } from "@/application/usecase/habit/dto/TestHabitProgressDto";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRepository } from "@/domain/repositories/HabitRepository";

export class TestGetOngoingHabitsUsecase {
    constructor(
        private readonly habitRepo: HabitRepository,
        private readonly recordRepo: HabitRecordRepository
    ) { }

    async execute(memberId: string): Promise<TestHabitProgressDto[]> {
        const habits = await this.habitRepo.TestFindOngoingByMemberId(memberId);
        const today = new Date();

        return await Promise.all(
            habits.map(async (habit) => {
                const start = new Date(habit.createdAt);
                const end = new Date(habit.finishedAt);

                const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

                const checkedCount = await this.recordRepo.TestCountByHabitId(habit.id);
                const rate = Math.round((checkedCount / totalDays) * 100);

                return new TestHabitProgressDto(
                    habit.id,
                    habit.categoryId,
                    habit.categoryName ?? "",
                    habit.name,
                    habit.description,
                    start.toISOString().slice(0, 10),
                    end.toISOString().slice(0, 10),
                    checkedCount,
                    totalDays,
                    `${rate}% (${checkedCount}일 / ${totalDays}일)`,
                    rate < 80
                );
            })
        );
    }
}