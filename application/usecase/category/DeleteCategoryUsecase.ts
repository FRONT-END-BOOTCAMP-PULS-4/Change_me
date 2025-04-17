import { CategoryView } from "@/domain/entities/CategoryView";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class DeleteCategoryUsecase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(id: number): Promise<void> {
        const category: CategoryView | null =
            await this.categoryRepository.findById(id);

        if (!category) {
            throw new Error("존재하지 않는 카테고리입니다.");
        }

        if (category.habitCount !== 0) {
            throw new Error("사용량이 0인 카테고리만 삭제 가능합니다.");
        }

        await this.categoryRepository.deleteById(id);
    }
}
