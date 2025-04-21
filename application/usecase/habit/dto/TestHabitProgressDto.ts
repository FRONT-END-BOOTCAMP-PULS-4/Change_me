export class TestHabitProgressDto {
    constructor(
        public id: number,
        public categoryId: number,
        public categoryName: string,
        public name: string,
        public description: string,
        public startAt: string,
        public finishedAt: string,
        public daysPassed: number,
        public duration: number,
        public rate: string
    ) { }
}