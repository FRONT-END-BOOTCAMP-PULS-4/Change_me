export class DeleteLike {
    constructor(private likeId: string) {}

    async execute() {
        // Logic to delete a like by its ID
        // This could involve calling a repository method to remove the like from the database
        console.log(`Deleting like with ID: ${this.likeId}`);
        // Example: await likeRepository.deleteById(this.likeId);
    }
}