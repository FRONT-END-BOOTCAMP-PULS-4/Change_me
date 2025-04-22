import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { AnonHabitListQueryDto } from "./dto/AnonHabitListQueryDto";
import { AnonHabitListDto } from "./dto/AnonHabitListDto";
import { HabitFilter } from "@/domain/repositories/filters/HabitFilter";

export class GetAnonHabitListUsecase {
    constructor(public repository: HabitRepository) {}

    async execute(queryDto: AnonHabitListQueryDto): Promise<AnonHabitListDto> {
        try {
            const categoryId = queryDto.categoryId || undefined;

            const filterAll = new HabitFilter(
                undefined,
                categoryId,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
            );

            const filterSuccess = new HabitFilter(
                undefined,
                categoryId,
                3,
                undefined,
                undefined,
                undefined,
                undefined,
            );

            const filterOngoing = new HabitFilter(
                undefined,
                categoryId,
                0,
                undefined,
                undefined,
                undefined,
                undefined,
            );

            const totalCount = await this.repository.count(filterAll);
            const successCount = await this.repository.count(filterSuccess);
            const ongoingCount = await this.repository.count(filterOngoing);
            const failureCount = totalCount - (successCount + ongoingCount);

            const habitData = await this.repository.findAll(filterSuccess);
            const habits = habitData.map((habit) => ({
                id: habit.id!,
                userNickname: habit.userNickname!,
                imageUrl: habit.imageUrl,
                habitName: habit.name!,
                description: habit.description!,
            }));

            const anonHabitListDto: AnonHabitListDto = {
                totalCount,
                ongoingCount,
                successCount,
                failureCount,
                habits,
            };

            return anonHabitListDto;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`);
            } else {
                throw new Error("모두의 습관 조회 실패 : 알 수 없는 오류");
            }
        }
    }
}
