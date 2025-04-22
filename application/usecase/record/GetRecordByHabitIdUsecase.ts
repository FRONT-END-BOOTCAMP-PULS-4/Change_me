import { HabitRecord } from "@/domain/entities/HabitRecord";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRecordFilter } from "@/domain/repositories/filters/HabitRecordFilter";
import { GetRecordByHabitIdDto } from "./dto/GetRecordByHabitIdDto";

export class GetRecordByHabitIdUsecase {
    constructor(private habitRecordRepository: HabitRecordRepository) {}

    async execute(dto: GetRecordByHabitIdDto): Promise<HabitRecord[]> {
        // DTO를 필터로 변환
        const filter = new HabitRecordFilter(
            dto.habitId,
            dto.memberId,
            false, // includeAll
            'date', // sortField
            false, // ascending
            0, // offset
            30 // limit - 한 달치 기록을 가져온다고 가정
        );

        return this.habitRecordRepository.findAll(filter);
    }
}
