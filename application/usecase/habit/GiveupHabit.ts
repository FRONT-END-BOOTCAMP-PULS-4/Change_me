export class GiveupHabit {
    constructor(private habitId: number) {}

    public execute(): string {
        // Logic to give up a habit
        // This could involve updating the habit's status in the database
        // or performing any necessary cleanup operations.

        return `Habit with ID ${this.habitId} has been given up.`;
    }
}