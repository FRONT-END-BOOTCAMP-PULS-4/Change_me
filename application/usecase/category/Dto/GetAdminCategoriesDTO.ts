export class GetAdminCategoriesDTO {
    constructor(
        public page: number = 1,
        public limit: number = 10,
        public sortBy: string = 'name',
        public sortOrder: 'asc' | 'desc' = 'asc'
    ) {}
}