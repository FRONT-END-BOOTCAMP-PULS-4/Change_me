import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { ViewQueryDto } from "./dto/ViewQueryDto";
import { HabitListDto } from "./dto/HabitListDto";
import { HabitFilter } from "@/domain/repositories/filters/HabitFilter";
import { HabitDto } from "./dto/HabitDto";
import { Habit } from "@/domain/entities/Habit";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRecordDto } from "./dto/HabitRecordDto";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { HabitRecord } from "@/domain/entities/HabitRecord";

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
            const memberId: string | undefined = queryDto.memberId;
            const categoryId: number | undefined = queryDto.categoryId;
            const status: number | undefined = queryDto.status;

            const offset: number = (currentPage - 1) * pageSize; // Q : offset은 왜 QueryDto에 포함되지 않나요?
            // offset은 페이지네이션을 위해 계산된 값으로, 쿼리 파라미터로 전달할 필요가 없습니다.
            // 페이지네이션을 위해 쿼리 파라미터로 전달되는 currentPage를 사용하여 offset을 계산합니다.
            // 그러면 왜 currentPage는 QueryDto에 포함되나요?
            // A : currentPage는 클라이언트에서 요청할 때 사용자가 지정하는 값입니다.
            // 그러면 왜 페이지네이션은 QueryDto에 포함되지 않나요?
            // A : 페이지네이션은 클라이언트에서 요청할 때 사용자가 지정하는 값입니다.
            const limit: number = pageSize;

            // HabitFilter를 사용하여 필터링 조건 설정
            const filter = new HabitFilter(
                memberId,
                categoryId,
                status,
                undefined, // sortField
                undefined, // ascending
                offset,
                limit,
            );

            // 데이터 조회
            const habits = await this.habitRepository.findAll(filter);

            // 전체 개수 계산 (count 메소드가 있다면 사용)
            const totalCount = habits.length; // 실제로는 전체 개수에 대한 쿼리가 필요할 수 있음
            const totalPages = Math.ceil(totalCount / pageSize);

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

            return new HabitListDto(
                habitDtos,
                totalCount,
                currentPage,
                totalPages,
            );
        } catch (error) {
            console.error("습관 목록 조회 중 오류 발생:", error);
            throw new Error("습관 목록 조회에 실패했습니다.");
        }
    }
}
