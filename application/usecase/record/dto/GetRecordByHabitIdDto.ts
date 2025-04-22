export class GetRecordByHabitIdDto {
    constructor(
        public habitId: number,
        public memberId: string
    ) {}
}