import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { GetRecordDto } from "./dto/GetRecordDto";
import { HabitRecordFilter } from "@/domain/repositories/filters/HabitRecordFilter";
import { HabitRecord } from "@/domain/entities/HabitRecord";
import { RecordDto } from "./dto/RecordDto";

export class GetRecordUsecase {
    private habitRecordRepository: HabitRecordRepository;

    constructor(habitRecordRepository: HabitRecordRepository) {
        this.habitRecordRepository = habitRecordRepository;
    }

    async execute(getRecordDto: GetRecordDto): Promise<RecordDto> {
        try {
            const habitId: number = getRecordDto.habitId;

            // data query
            const filter = new HabitRecordFilter(habitId);

            const records: HabitRecord[] =
                await this.habitRecordRepository.findAll(filter);

            // convert Message to MessageDto
            const dates: Date[] = records.map((record) => record.date);

            const recordDto: RecordDto = {
                dates,
            };

            return recordDto;
        } catch (error) {
            console.error("Error retrieving habit records:", error);
            throw new Error("Error retrieving habit records.");
        }
    }
}
