export class HabitDto {
    constructor(
        public id: number,
        public category: string,
        public name : string,
        public description : string,
        public startAt : string,
        public finishedAt : string,
        public stoppedAt: string,
        public duration: string,
        public rate: string,
    ) {}
}