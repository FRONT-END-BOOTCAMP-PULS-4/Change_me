export class UpdateHabitDto {
    constructor(
        public id: number,
        public memberId: string,
        public categoryId: number,
        public name: string,
        public description: string,
        public finishedAt: string
    ) { }
}