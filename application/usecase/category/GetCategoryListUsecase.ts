import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { GetCategoryListQueryDto } from "./dto/GetCategoryListQueryDto";
import { CategoryListDto } from "./dto/CategoryListDto";
import { CategoryFilter } from "@/domain/repositories/filters/CategoryFilter";
import { CategoryDto } from "./dto/CategoryDto";

export class GetCategoryListUseCase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(queryDto: GetCategoryListQueryDto): Promise<CategoryListDto> {
        try {
            const popular = queryDto.popular || false;

            const filter = new CategoryFilter(popular);

            const categories = await this.categoryRepository.findAll(filter);
            const categoryDtos: CategoryDto[] = categories.map((category) => ({
                id: category.id,
                name: category.name,
            }));

            const categoryListDto: CategoryListDto = {
                categories: categoryDtos,
            };

            return categoryListDto;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`);
            } else {
                throw new Error("카테고리 조회 실패: 알 수 없는 오류");
            }
        }
    }
}
