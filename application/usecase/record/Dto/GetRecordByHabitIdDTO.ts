export class GetRecordByHabitIdDTO {
    constructor(
        public habitId: number,
        public memberId: string
    ) {}
}