import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { GetTodayHabitRecordDto } from "./dto/GetTodayHabitRecordDto";

export class GetTodayCheckedHabitIdsUsecase {
    constructor(private readonly repo: HabitRecordRepository) { }

    async execute(dto: GetTodayHabitRecordDto): Promise<number[]> {
        return await this.repo.GetTodayCheckedHabitIds(dto.memberId, dto.date);
    }
}