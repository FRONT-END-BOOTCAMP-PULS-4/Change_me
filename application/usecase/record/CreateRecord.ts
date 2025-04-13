export class CreateRecord {
    constructor(public habitId: number, public date: Date) {}

    public async execute(): Promise<void> {
        // Logic to create a new record in the database
        // This would typically involve calling a repository method
        // to save the record using the provided habitId and date.
    }
}