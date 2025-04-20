import {Habit} from "../../../domain/entities/Habit";
import {HabitRepository} from "@/domain/repositories/HabitRepository";
import {HabitFilter} from "@/domain/repositories/filters/HabitFilter";
import { createClient } from "@/utils/supabase/Server";

export class SbHabitRepository implements HabitRepository {
    private queryFilter(
        filter : HabitFilter | undefined,
        query : any
    ) {
        if (filter) {
            if (filter.memberId) {
                query = query.eq('member_id', filter.memberId);
            }
            if (filter.categoryId) {
                query = query.eq('category_id', filter.categoryId);
            }
            if (filter.status !== undefined) {
                query = query.eq('status', filter.status);
            }
        }

        return query;
    }
    
    async findAll(filter?: HabitFilter): Promise<Habit[]>{
        const supabase = await createClient();
        
        let query = supabase
            .from('habits')
            .select('*')
            .order('created_at', { ascending: false })
            .range(
                filter?.offset || 0,
                (filter?.offset || 0) + (filter?.limit || 10) - 1
            );

        query = this.queryFilter(filter, query);

        const { data } = await query;

        console.log("Fetched habits:", data);

        const habits: Habit[] = 
        data.map((habit: any) => ({ // Q : data.map은 어떤 역할을 하나요?
            // A : data.map은 데이터베이스에서 가져온 각 habit 객체를 Habit 객체로 변환하는 역할을 합니다.
            // Habit 객체는 도메인 모델로, 비즈니스 로직에서 사용됩니다.
            // data.map은 각 habit 객체를 반복하면서 새로운 배열을 생성합니다.
            id: habit.id,
            categoryId: habit.category_id,
            memberId: habit.member_id,
            name: habit.name,
            description: habit.description,
            createdAt: new Date(habit.created_at),
            finishedAt: new Date(habit.finished_at),
            stoppedAt: habit.stopped_at,
            status: habit.status,
        })) || [];
        return habits;
    }

    async findById(id: number): Promise<Habit | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habits')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error('Failed to find habit by ID: ${error.habit}');
        }
        if (!data) {
            return null;
        }
        return new Habit(
            data.id,
            data.category_id,
            data.member_id,
            data.name,
            data.description,
            new Date(data.created_at),
            new Date(data.finished_at),
            data.stopped_at,
            data.status
        );
    }

    async save(habit: Habit): Promise<Habit> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habits')
            .insert({
                category_id: habit.categoryId,
                member_id: habit.memberId,
                name: habit.name,
                description: habit.description,
            })
            .select('*')
            .single();

        if (error) {
            throw new Error(`Failed to save habit: ${error.message}`);
        }

        return new Habit(
            data.id,
            data.category_id,
            data.member_id,
            data.name,
            data.description,
            new Date(data.created_at),
            new Date(data.finished_at),
            data.stopped_at,
            data.status
        );
    }

    async update(habit: Habit): Promise<Habit> {
        const supabase = await createClient();

        const  { data, error } = await supabase
        .from('habits')
        .update({
            member_id : habit.memberId,
            description : habit.description,
            status : habit.status,
            finished_at : habit.finishedAt,
            stopped_at : habit.stoppedAt,
        })
        .eq('id', habit.id)
        .select("*")
        .single()
        if (error) {
            throw new Error('Failed to update habit: ${error.message}');
        }
        return new Habit(
            data.id,
            data.category_id,
            data.member_id,
            data.name,
            data.description,
            new Date(data.created_at),
            new Date(data.finished_at),
            data.stopped_at,
            data.status
        );
    }

    async deleteById(id: number): Promise<void> {
        const supabase = await createClient();

        const {error} = await supabase.from("habit").delete().eq("id", id);
        if (error){
            throw new Error(
                `failed to delete message with id ${id}: ${error.message}`
            );
        }
    }
}
