import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { GetAdmincategoryListQueryDto } from "./dto/GetAdminCategoryListQueryDto";
import { AdminCategoryListDto } from "./dto/AdminCategoryListDto";
import { CategoryFilter } from "@/domain/repositories/filters/CategoryFilter";
import { CategoryDto } from "./dto/CategoryDto";

const PAGE_SIZE = 15;

export class GetAdminCategoryListUsecase {
    constructor(private categoryRepository: CategoryRepository) {}

    async execute(
        queryDto: GetAdmincategoryListQueryDto,
    ): Promise<AdminCategoryListDto> {
        try {
            const currentPage = queryDto.currentPage || 1;
            const popular = false;
            const limit = PAGE_SIZE;
            const offset = (currentPage - 1) * PAGE_SIZE;

            const filter = new CategoryFilter(popular, offset, limit);

            const categories: CategoryDto[] =
                await this.categoryRepository.findAll(filter);
            const totalCount = await this.categoryRepository.count();

            const startPage =
                Math.floor((currentPage - 1) / PAGE_SIZE) * PAGE_SIZE + 1;
            const endPage = Math.ceil(totalCount / PAGE_SIZE);
            const pages = Array.from(
                { length: 10 },
                (_, i) => startPage + i,
            ).filter((pageNumber) => pageNumber <= endPage);

            const adminCategoryListDto: AdminCategoryListDto = {
                categories: categories,
                totalCount: totalCount,
                endPage: endPage,
                pages: pages,
            };

            return adminCategoryListDto;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`${error.message}`);
            } else {
                throw new Error("카테고리 조회 실패: 알 수 없는 오류");
            }
        }
    }
}
