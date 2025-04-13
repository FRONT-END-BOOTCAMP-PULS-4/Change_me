export class UpdateHabit {
    constructor(
        public id: number,
        public name?: string,
        public description?: string,
        public status?: number
    ) {}

    public async execute(): Promise<void> {
        // Logic to update the habit in the database
        // This would typically involve calling a repository method
        // to update the habit based on the provided id and other properties.
    }
}