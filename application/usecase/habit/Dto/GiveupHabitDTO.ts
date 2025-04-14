export class GiveupHabitDTO {
    constructor(
        public habitId: number,
        public reason?: string
    ) {}
}