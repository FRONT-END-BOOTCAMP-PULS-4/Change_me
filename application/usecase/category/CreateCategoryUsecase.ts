import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CreateCategoryDto } from "./dto/CreateCategoryDto";
import { Category } from "@/domain/entities/Category";

export class CreateCategoryUsecase {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(createDto: CreateCategoryDto) {
        const category: Category = new Category();
        category.name = createDto.name;
        category.memberId = createDto.memberId;

        const newCategory = await this.categoryRepository.save(category);
        return newCategory;
    }
}
