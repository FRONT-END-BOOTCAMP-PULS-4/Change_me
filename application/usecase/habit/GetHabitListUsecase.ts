import { HabitRepository } from '@/domain/repositories/HabitRepository';
import { ViewQueryDto } from './dto/ViewQueryDto';
import { HabitListDto } from './dto/HabitListDto';
import { HabitFilter } from '@/domain/repositories/filters/HabitFilter';
import { HabitDto } from './dto/HabitDto';
import { Habit } from '@/domain/entities/Habit';
import { differenceInDays } from 'date-fns';
import { HabitRecordRepository } from '@/domain/repositories/HabitRecordRepository';
import { TestHabitRecordDto} from './dto/TestHabitRecordDto';

export class GetHabitListUsecase {
    private habitRepository: HabitRepository;
    private habitRecordRepository: HabitRecordRepository;

    constructor(habitRepository: HabitRepository, habitRecordRepository: HabitRecordRepository) {
        this.habitRepository = habitRepository;
        this.habitRecordRepository = habitRecordRepository;
    }

    async execute(queryDto: ViewQueryDto, testHabitRecordDto : TestHabitRecordDto): Promise<HabitListDto> {
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
                limit
            );
            
            // 데이터 조회
            const habits = await this.habitRepository.findAll(filter);
            
            // 전체 개수 계산 (count 메소드가 있다면 사용)
            const totalCount = habits.length; // 실제로는 전체 개수에 대한 쿼리가 필요할 수 있음
            const totalPages = Math.ceil(totalCount / pageSize);
            
            // 응답 데이터 변환 - 습관 상태에 따른 로직 처리
            const habitDtos: HabitDto[] = await Promise.all(
                habits.map(async (habit) => {
                    // 카테고리 이름 가져오기 (여기서는 임시로 카테고리 ID를 사용)
                    const categoryName = `카테고리 ${habit.categoryId}`;
                    
                    /*
                     * 습관 상태(status)별 기간(duration) 계산 경우의 수:
                     * ------------------------------------------------
                     * status = 0 (진행중): createdAt ~ 현재날짜
                     * status = 1 (실패): createdAt ~ finishedAt
                     * status = 2 (포기): createdAt ~ stoppedAt (없으면 현재날짜)
                     * status = 3 (달성): createdAt ~ finishedAt
                     */
                    let endDate = new Date();
                    if (habit.status === 1 || habit.status === 3) { // 실패 또는 달성
                        endDate = habit.finishedAt;
                    } else if (habit.status === 2) { // 포기
                        endDate = habit.stoppedAt || new Date();
                    }
                    
                    // 습관의 총 기간(일수) 계산
                    const totalDays = differenceInDays(endDate, habit.createdAt) + 1; // +1은 시작일도 포함
                    const duration = `${totalDays}일`;
                    
                    /*
                     * 습관 상태(status)별 달성률(rate) 계산 경우의 수:
                     * ------------------------------------------------
                     * status = 3 (달성): 100% (달성 완료된 습관)
                     * status = 0 (진행중): (체크된 일수 / 현재까지 경과일) * 100%
                     * status = 1 (실패): (체크된 일수 / 총 기간) * 100%
                     * status = 2 (포기): (체크된 일수 / 포기일까지의 기간) * 100%
                     */
                    let rate = '0%';
                    
                    // 각 상태별 달성률 계산 로직
                    if (habit.status === 3) { // 달성 완료된 습관
                        rate = '100%';
                    } else {
                        try {
                            // HabitRecord 테이블에서 해당 습관에 대한 체크 기록 조회
                            const habitRecords = await this.habitRecordRepository.TestGetTodayCheckedHabitIds(
                                testHabitRecordDto.memberId, 
                                new Date()
                            );
                            
                            // 해당 습관이 체크된 기록이 있는지 확인
                            const isChecked = habitRecords.includes(habit.id);
                            
                            // 총 일수가 0보다 크면 각 상태별 달성률 계산
                            if (totalDays > 0) {
                                let percentage = 0;
                                
                                if (isChecked) {
                                    switch(habit.status) {
                                        case 0: // 진행중
                                            // 현재까지 경과일에 대한 달성률
                                            const daysFromStart = differenceInDays(new Date(), habit.createdAt) + 1;
                                            percentage = Math.round((1 / daysFromStart) * 100);
                                            break;
                                        case 1: // 실패
                                            // 총 기간에 대한 달성률
                                            percentage = Math.round((1 / totalDays) * 100);
                                            break;
                                        case 2: // 포기
                                            // 포기일까지의 기간에 대한 달성률
                                            const daysUntilStopped = differenceInDays(
                                                habit.stoppedAt || new Date(), 
                                                habit.createdAt
                                            ) + 1;
                                            percentage = Math.round((1 / daysUntilStopped) * 100);
                                            break;
                                    }
                                }
                                
                                rate = `${percentage}%`;
                            }
                        } catch (error) {
                            console.error(`습관 ID ${habit.id}의 기록 조회 중 오류 발생:`, error);
                            // 오류 발생 시 기본값 사용
                            rate = '0%';
                        }
                    }
                    
                    return new HabitDto(
                        habit.id,
                        categoryName,
                        habit.name,
                        habit.description,
                        habit.createdAt.toISOString(),
                        habit.finishedAt.toISOString(),
                        habit.stoppedAt?.toISOString() || '',
                        duration,
                        rate
                    );
                })
            );
            
            return new HabitListDto(
                habitDtos,
                totalCount,
                currentPage,
                totalPages
            );
            
        } catch (error) {
            console.error("습관 목록 조회 중 오류 발생:", error);
            throw new Error("습관 목록 조회에 실패했습니다.");
        }
    }
}
