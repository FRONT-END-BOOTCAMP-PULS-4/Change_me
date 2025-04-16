import { CategoryDto } from "./CategoryDto";

export class AdminCategoryListDto {
    constructor(
        public categories: CategoryDto[],
        public totalCount: number,
        public endPage: number,
        public pages: number[],
    ) {}
}
