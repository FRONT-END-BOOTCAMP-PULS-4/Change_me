export class GiveupHabitDto {
    constructor(
        public habitId: number,
        public reason?: string
    ) {}
}