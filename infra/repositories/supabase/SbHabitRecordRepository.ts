import { HabitRecord } from "../../../domain/entities/HabitRecord";
import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRecordFilter } from "@/domain/repositories/filters/HabitRecordFilter";
import { createClient } from "@/utils/supabase/Server";

export class SbHabitRecordRepository implements HabitRecordRepository {
    private queryFilter(
        filter: HabitRecordFilter | undefined,
        query: any
    ) {
        if (filter) {
            if (filter.habitId) {
                query = query.eq('habit_id', filter.habitId);
            }
            
            // 정렬 필드가 있는 경우 정렬 적용
            if (filter.sortField) {
                query = query.order(filter.sortField, { 
                    ascending: filter.ascending ?? false 
                });
            }
        }

        return query;
    }
    
    async findAll(filter?: HabitRecordFilter): Promise<HabitRecord[]> {
        const supabase = await createClient();
        
        let query = supabase
            .from('habit_records')
            .select('*');
        
        // 기본 정렬이 없는 경우 생성일 기준으로 정렬
        if (!filter?.sortField) {
            query = query.order('created_at', { ascending: false });
        }
        
        // 페이지네이션 처리
        query = query.range(
            filter?.offset || 0,
            (filter?.offset || 0) + (filter?.limit || 10) - 1
        );

        // 필터 적용
        query = this.queryFilter(filter, query);

        const { data, error } = await query;

        if (error) {
            throw new Error(`Failed to fetch habit records: ${error.message}`);
        }

        console.log("Fetched habit records:", data);

        const habitRecords: HabitRecord[] = data.map((record: any) => new HabitRecord(
            record.id,
            record.habit_id,
            record.content,
            new Date(record.created_at),
            record.is_completed
        )) || [];
        
        return habitRecords;
    }

    async findById(id: number): Promise<HabitRecord | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habit_records')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) {
            throw new Error(`Failed to find habit record by ID: ${error.message}`);
        }
        
        if (!data) {
            return null;
        }
        
        return new HabitRecord(
            data.id,
            data.habit_id,
            data.content,
            new Date(data.created_at),
            data.is_completed
        );
    }

    async save(habitRecord: HabitRecord): Promise<HabitRecord> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habit_records')
            .insert({
                habit_id: habitRecord.habitId,
                content: habitRecord.content,
                is_completed: habitRecord.isCompleted
            })
            .select('*')
            .single();

        if (error) {
            throw new Error(`Failed to save habit record: ${error.message}`);
        }

        return new HabitRecord(
            data.id,
            data.habit_id,
            data.content,
            new Date(data.created_at),
            data.is_completed
        );
    }

    async update(habitRecord: HabitRecord): Promise<HabitRecord> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habit_records')
            .update({
                habit_id: habitRecord.habitId,
                content: habitRecord.content,
                is_completed: habitRecord.isCompleted
            })
            .eq('id', habitRecord.id)
            .select("*")
            .single();
            
        if (error) {
            throw new Error(`Failed to update habit record: ${error.message}`);
        }
        
        return new HabitRecord(
            data.id,
            data.habit_id,
            data.content,
            new Date(data.created_at),
            data.is_completed
        );
    }

    async deleteById(id: number): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase
            .from("habit_records")
            .delete()
            .eq("id", id);
            
        if (error) {
            throw new Error(
                `Failed to delete habit record with id ${id}: ${error.message}`
            );
        }
    }
}
