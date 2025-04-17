import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { UpdateCategoryDto } from "./dto/UpdateCategoryDto";
import { CategoryView } from "@/domain/entities/CategoryView";

export class UpdateCategoryUsecase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(updateDto: UpdateCategoryDto) {
        const category: CategoryView = await this.categoryRepository.findById(
            updateDto.id,
        );
        if (category.habitCount !== 0) {
            throw new Error("사용량이 0인 카테고리만 수정 가능합니다.");
        }

        await this.categoryRepository.update({
            id: updateDto.id,
            name: updateDto.name,
        });
    }
}
