export class DeleteHabit {
    constructor(private habitId: number) {}

    async execute() {
        // Logic to delete the habit from the database
        // This could involve calling a repository method to remove the habit
        // For example:
        // await habitRepository.deleteById(this.habitId);
    }
}