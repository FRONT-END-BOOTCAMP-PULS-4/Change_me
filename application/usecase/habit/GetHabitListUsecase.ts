import { HabitRepository } from '@/domain/repositories/HabitRepository';
import { QueryDto } from  './dto/QueryDto';
import { HabitListDto } from './dto/GetHabitDto';
import { HabitFilter } from '@/domain/repositories/filters/HabitFilter';
import { Habitdto } from './dto/HabitDto';
import { Habit } from '@/domain/entities/Habit'; // Habit 엔티티 임포트 추가

export class GetHabitListUsecase {
    private habitRepository: HabitRepository;

    constructor(habitRepository: HabitRepository) {
        this.habitRepository = habitRepository;
    }

    async execute(queryDto : QueryDto) : Promise<HabitListDto>{
        try{
            const pageSize : number = 5;
            const currentPage : number =  queryDto.currentPage || 1;
            const mine : boolean = queryDto.mine || false;

            const offset: number = (currentPage - 1) * pageSize;
            const limit: number = pageSize;

            const memberId: string = "temp"; 
            const categoryId: number = queryDto.categoryId||undefined; 
            const status: number = queryDto.status||undefined;
            
            // data query
            const filter = new HabitFilter(
                memberId,
                categoryId,
                status,
                undefined, // sortField 지워도 됨
                undefined, // ascending 지워도 됨
                offset,
                limit,
            );
            const habits: Habit[] =
             await this.habitRepository.findAll(filter);
            // const totalCount: number 
            //     await this.habitRepository.count(filter);
            
            // 응답 데이터 생성
            const habitDtos: Habitdto[] = await Promise.all(
                habits.map(async (habit) => {
                    let member: Member | null = 
                        await this.habitRepository.findById(habit.memberId);
                });
                return {
                    id : Message.id,
                    name: memberId.name,
                    email: memberId.email
                    writer ; member?.name || "Unknown",
                    profileUrl:
                    member?
                }
                    