import { Habit } from "./Habit";

export class HabitMember extends Habit {
    constructor(
        public userNickname: string,
        public imageUrl: string | null,
        public isActive: boolean,
    ) {
        super();
    }
}
