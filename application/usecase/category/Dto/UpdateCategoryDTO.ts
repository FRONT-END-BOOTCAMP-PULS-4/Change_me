export class UpdateCategoryDTO {
    constructor(
        public id: number,
        public name?: string,
        public description?: string
    ) {}
}