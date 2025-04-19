import { HabitRepository } from '@/domain/repositories/HabitRepository';
import { ViewQueryDto } from '@/dto/ViewQueryDto';
import { HabitListDto } from '@/dto/HabitListDto';
import { HabitFilter } from '@/domain/repositories/filters/HabitFilter';
import { HabitDto } from './dto/HabitDto';
import { Habit } from '@/domain/entities/Habit';
import { differenceInDays } from 'date-fns';

export class GetHabitListUsecase {
    private habitRepository: HabitRepository;

    constructor(habitRepository: HabitRepository) {
        this.habitRepository = habitRepository;
    }

    async execute(queryDto: ViewQueryDto): Promise<HabitListDto> {
        try {
            const pageSize: number = 10;
            const currentPage: number = queryDto.currentPage || 1;
            const memberId: string = queryDto.memberId;
            const categoryId: number | undefined = queryDto.categoryId;
            const status: number | undefined = queryDto.status;
            
            const offset: number = (currentPage - 1) * pageSize;
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
            
            // 응답 데이터 변환
            const habitDtos: HabitDto[] = await Promise.all(
                habits.map(async (habit) => {
                    // 카테고리 이름 가져오기 (여기서는 임시로 카테고리 ID를 사용)
                    const categoryName = `카테고리 ${habit.categoryId}`;
                    
                    // 시작일과 종료일/포기일 사이의 기간 계산
                    let endDate = new Date();
                    if (habit.status === 1 || habit.status === 3) { // 실패 또는 달성
                        endDate = habit.finishedAt;
                    } else if (habit.status === 2) { // 포기
                        endDate = habit.stoppedAt;
                    }
                    
                    const duration = `${differenceInDays(endDate, habit.createdAt)}일`;
                    
                    // 달성률 계산 (실제로는 HabitRecord 테이블에서 조회 필요)
                    // 임시로 고정 값 사용
                    const rate = habit.status === 3 ? '100%' : '90%';
                    
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
