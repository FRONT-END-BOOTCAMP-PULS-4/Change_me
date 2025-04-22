import { Habit } from "./Habit";

export class HabitMember extends Habit {
    constructor(public userNickname: string) {
        super();
    }
}
