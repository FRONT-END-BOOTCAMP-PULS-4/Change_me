export class CreateHabitDto {
    constructor(
        public memberId: string,
        public categoryId: number,
        public name: string,
        public description: string,
        public finishedAt: string // ISO 문자열
    ) { }
}