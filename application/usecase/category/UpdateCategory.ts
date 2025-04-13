export class UpdateCategory {
    constructor(private categoryId: number, private updatedData: UpdateCategoryDTO) {}

    async execute() {
        // Logic to update the category in the database
        // This could involve calling a repository method to perform the update
    }
}

export interface UpdateCategoryDTO {
    name?: string;
    description?: string;
}