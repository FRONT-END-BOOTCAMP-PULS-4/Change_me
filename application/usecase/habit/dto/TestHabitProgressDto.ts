export class TestHabitProgressDto {
    constructor(
        public id: number,
        public categoryId: number,
        public categoryName: string,
        public name: string,
        public description: string,
        public startAt: string,
        public finishedAt: string,
        public checkedDays: number,
        public duration: number,
        public rate: string,
        public canGiveUp: boolean,
        public daysPassed: number
    ) { }
}