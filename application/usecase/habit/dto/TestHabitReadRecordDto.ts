export class TestHabitReadRecordDto {
    constructor(
        public id: number,
        public categoryId: number,
        public categoryName: string,
        public name: string,
        public description: string,
        public startAt: string,
        public finishedAt: string,
        public stoppedAt: string | null,
        public duration: number,
        public rate: string,
    ) { }
}