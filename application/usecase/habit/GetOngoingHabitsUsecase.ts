import { HabitProgressDto } from "@/application/usecase/habit/dto/HabitProgressDto";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRepository } from "@/domain/repositories/HabitRepository";

export class GetOngoingHabitsUsecase {
    constructor(
        private readonly habitRepo: HabitRepository,
        private readonly recordRepo: HabitRecordRepository
    ) { }

    async execute(memberId: string): Promise<HabitProgressDto[]> {
        const habits = await this.habitRepo.findOngoingByMemberId(memberId);
        const today = new Date();

        return await Promise.all(
            habits.map(async (habit) => {
                const start = new Date(habit.createdAt);
                const end = new Date(habit.finishedAt);
                const getMidnight = (date: Date) => {
                    const d = new Date(date);
                    d.setHours(0, 0, 0, 0); // 자정으로 초기화
                    return d;
                };

                const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                const dayPassed = Math.ceil(
                    (getMidnight(today).getTime() - getMidnight(start).getTime()) / (1000 * 60 * 60 * 24) + 1
                );

                const checkedDays = await this.recordRepo.countByHabitId(habit.id);
                const rate = Math.round((checkedDays / totalDays) * 100);

                return new HabitProgressDto(
                    habit.id,
                    habit.categoryId,
                    habit.categoryName ?? "",
                    habit.name,
                    habit.description,
                    start.toISOString().slice(0, 10),
                    end.toISOString().slice(0, 10),
                    checkedDays,
                    totalDays,
                    `${rate}% (${checkedDays}일 / ${totalDays}일)`,
                    rate < 80,
                    dayPassed
                );
            })
        );
    }
}