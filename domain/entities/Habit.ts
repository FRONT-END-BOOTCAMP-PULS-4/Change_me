
export class Habit{
    constructor(
        public id: number,
        public categoryId: number,
        public memberId: string,
        public name: string,
        public description: string,
        public createdAt: Date,
        public finishedAt: Date,
        public stoppedAt: Date,
        public status: number
    ) {}
}
