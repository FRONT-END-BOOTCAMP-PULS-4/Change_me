export class UpdateHabitDTO {
    constructor(
        public id: number,
        public name?: string,
        public description?: string,
        public status?: number
    ) {}
}