export class AnonHabitDto {
    constructor(
        public id: number,
        public userNickname: string,
        public imageUrl: string | null,
        public isActive: boolean,
        public habitName: string,
        public description: string,
    ) {}
}
