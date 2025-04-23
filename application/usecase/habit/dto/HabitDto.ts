export class HabitDto {
    constructor(
        public id: number,
        public categoryname: string,
        public name: string,
        public description: string,
        public createdAt: string,
        public finishedAt: string,
        public stoppedAt: string,
        public duration: string,
        public rate: number,
    ) {}
}
