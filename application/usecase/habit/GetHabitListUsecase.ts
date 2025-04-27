import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { ViewQueryDto } from "./dto/ViewQueryDto";
import { HabitListDto } from "./dto/HabitListDto";
import { HabitFilter } from "@/domain/repositories/filters/HabitFilter";
import { HabitDto } from "./dto/HabitDto";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";

export class GetHabitListUsecase {
    private habitRepository: HabitRepository;
    private habitRecordRepository: HabitRecordRepository;
    private categoryRepository: CategoryRepository;

    constructor(
        habitRepository: HabitRepository,
        habitRecordRepository: HabitRecordRepository,
        categoryRepository: CategoryRepository,
    ) {
        this.habitRepository = habitRepository;
        this.habitRecordRepository = habitRecordRepository;
        this.categoryRepository = categoryRepository;
    }

    async execute(queryDto: ViewQueryDto): Promise<HabitListDto> {
        try {
            const pageSize: number = 10;
            const currentPage: number = queryDto.currentPage || 1;
            const offset: number = (currentPage - 1) * pageSize;
            const limit: number = pageSize;

            const memberId: string | undefined = queryDto.memberId;
            const categoryId: number | undefined = queryDto.categoryId;
            const status: number | undefined = queryDto.status;

            // HabitFilter를 사용하여 필터링 조건 설정
            const listFilter = new HabitFilter(
                memberId,
                categoryId,
                status,
                undefined, // sortField
                undefined, // ascending
                offset,
                limit,
            );

            const countFilter = new HabitFilter(
                memberId,
                categoryId,
                status,
                undefined,
                undefined,
                undefined,
                undefined,
            );

            // 전체 개수 계산 (count 메소드가 있다면 사용)
            const totalCount = await this.habitRepository.count(countFilter); // 실제로는 전체 개수에 대한 쿼리가 필요할 수 있음
            const startPage =
                Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
            const endPage = Math.ceil(totalCount / pageSize);
            const pages = Array.from(
                { length: 10 },
                (_, i) => startPage + i,
            ).filter((pageNumber) => pageNumber <= endPage);

            // 데이터 조회
            const habits = await this.habitRepository.findAll(listFilter);

            // 응답 데이터 변환
            const habitDtos: HabitDto[] = await Promise.all(
                habits.map(async (habit) => {
                    let duration: string = "";
                    let rate: number = 0;
                    // 카테고리 이름 가져오기
                    const category = await this.categoryRepository.findById(
                        habit.categoryId!,
                    );
                    const categoryName = category?.name;
                    let endDate = habit.finishedAt;

                    try {
                        // 습관의 총 기간(일수) 계산
                        const getDateDiff = (d1: Date, d2: Date): number => {
                            const date1 = new Date(d1);
                            const date2 = new Date(d2);

                            const diffDate = date1.getTime() - date2.getTime();

                            return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
                        };

                        const totalDays =
                            getDateDiff(habit.createdAt!, endDate!) + 1; // +1은 시작일도 포함

                        duration = `${totalDays}일`;

                        /*
                         * 습관 상태(status)별 달성률(rate) 계산 경우의 수:
                         * ------------------------------------------------
                         * status = 3 (달성): (체크된 일수 / 총 기간) * 100%
                         * status = 0 (진행중): (체크된 일수 / 현재까지 경과일) * 100%
                         * status = 1 (실패): (체크된 일수 / 총 기간) * 100%
                         * status = 2 (포기): (체크된 일수 / 포기일까지의 기간) * 100%
                         */

                        // 각 상태별 달성률 계산 로직
                        const record =
                            await this.habitRecordRepository.findById(
                                habit.id!,
                            );

                        const checknum: number = record!.length;
                        if (habit.status === 3 || 1) {
                            // 달성 완료된 습관
                            rate = (checknum / totalDays) * 100;
                        } else if (habit.status === 2) {
                            // 포기한 습관
                            rate = (checknum / totalDays) * 100;
                        } else {
                            rate = (checknum / totalDays) * 100;
                        }

                        // 총 일수가 0보다 크면 각 상태별 달성률 계산
                    } catch (error) {
                        console.error(
                            `습관 ID ${habit.id}의 기록 조회 중 오류 발생:`,
                            error,
                        );
                        // 오류 발생 시 기본값 사용
                    }

                    return new HabitDto(
                        habit.id!,
                        categoryName!,
                        habit.name!,
                        habit.description!,
                        habit.createdAt!.toISOString(),
                        habit.finishedAt!.toISOString(),
                        habit.stoppedAt?.toISOString() || "",
                        duration,
                        rate,
                    );
                }),
            );

            return new HabitListDto(habitDtos, endPage, currentPage, pages);
      } catch (error) {
            console.error("습관 목록 조회 중 오류 발생:", error);
            throw new Error("습관 목록 조회에 실패했습니다.");
        }
    }
}
