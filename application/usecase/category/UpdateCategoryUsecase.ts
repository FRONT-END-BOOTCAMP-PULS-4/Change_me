import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { UpdateCategoryDto } from "./dto/UpdateCategoryDto";
import { CategoryView } from "@/domain/entities/CategoryView";

export class UpdateCategoryUsecase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(updateDto: UpdateCategoryDto) {
        const category: CategoryView | null =
            await this.categoryRepository.findById(updateDto.id);
        console.log(category);

        if (!category) {
            throw new Error("존재하지 않는 카테고리입니다.");
        }

        if (category.habitCount !== 0) {
            throw new Error("사용량이 0인 카테고리만 수정 가능합니다.");
        }

        await this.categoryRepository.update({
            id: updateDto.id,
            name: updateDto.name,
        });
    }
}
