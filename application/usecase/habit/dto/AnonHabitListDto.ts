import { AnonHabitDto } from "./AnonHabitDto";

export class AnonHabitListDto {
    constructor(
        public totalCount: number,
        public ongoingCount: number,
        public successCount: number,
        public failureCount: number,
        public habits: AnonHabitDto[],
    ) {}
}
