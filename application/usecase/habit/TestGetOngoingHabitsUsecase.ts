import { TestHabitProgressDto } from "@/application/usecase/habit/dto/TestHabitProgressDto";
import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { formatDate } from "@/utils/date";

const stripTime = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export class TestGetOngoingHabitsUsecase {
    constructor(
        private readonly habitRepo: HabitRepository,
    ) { }

    async execute(memberId: string): Promise<TestHabitProgressDto[]> {
        const habits = await this.habitRepo.TestFindOngoingByMemberId(memberId);

        return habits.map((habit) => {
            const today = stripTime(new Date());
            const start = stripTime(habit.createdAt);
            const end = stripTime(habit.finishedAt);

            const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            const passedDays = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            const clampedDays = Math.max(0, Math.min(passedDays, totalDays));
            const rate = Math.round((clampedDays / totalDays) * 100);

            return new TestHabitProgressDto(
                habit.id,
                habit.categoryId,         // 카테고리 ID
                habit.categoryName || "", // 카테고리 이름 (필수 필드로 지정했다면 null 방지)
                habit.name,
                habit.description,
                formatDate(start),
                formatDate(end),
                clampedDays,
                totalDays,
                `${rate}% (${clampedDays}일 / ${totalDays}일)`
            );
        });
    }
}