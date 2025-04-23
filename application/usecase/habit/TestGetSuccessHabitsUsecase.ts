import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { TestHabitReadRecordDto } from "./dto/TestHabitReadRecordDto";

export class TestGetSuccessHabitsUsecase {
    constructor(
        private readonly habitRepo: HabitRepository,
        private readonly recordRepo: HabitRecordRepository
    ) { }

    async execute(memberId: string): Promise<TestHabitReadRecordDto[]> {
        const habits = await this.habitRepo.TestFindSuccessByMemberId(memberId);

        return await Promise.all(
            habits.map(async (habit) => {
                const start = new Date(habit.createdAt);
                const end = new Date(habit.finishedAt);
                const giveUp = habit.stoppedAt ? new Date(habit.stoppedAt) : null;
                const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                const checkedDays = await this.recordRepo.TestCountByHabitId(habit.id);
                const rate = Math.round((checkedDays / totalDays) * 100);

                return new TestHabitReadRecordDto(
                    habit.id,
                    habit.categoryId,
                    habit.categoryName ?? "",
                    habit.name,
                    habit.description,
                    start.toISOString().slice(0, 10),
                    end.toISOString().slice(0, 10),
                    giveUp ? giveUp.toISOString().slice(0, 10) : null,
                    totalDays,
                    `${rate}% `,
                );
            })
        );
    }
}