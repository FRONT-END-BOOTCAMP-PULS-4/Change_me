export class CreateCategory {
    constructor(public name: string, public description: string) {}

    async execute() {
        // Logic to create a new category
        // This could involve calling a repository method to save the category to a database
    }
}