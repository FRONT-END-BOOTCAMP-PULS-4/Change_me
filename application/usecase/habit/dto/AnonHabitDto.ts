export class AnonHabitDto {
    constructor(
        public id: number,
        public userNickname: string,
        public imageUrl: string | null,
        public habitName: string,
        public description: string,
    ) {}
}
