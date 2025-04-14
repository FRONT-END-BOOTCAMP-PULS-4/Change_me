export class GetCategoriesDTO {
    constructor(
        public page: number = 1,
        public limit: number = 10,
        public searchTerm?: string
    ) {}
}