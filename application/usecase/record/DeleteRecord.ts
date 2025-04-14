export class DeleteRecord {
    constructor(private recordId: number) {}

    async execute(): Promise<void> {
        // Logic to delete the record by recordId
        // This could involve calling a repository method to perform the deletion
    }
}