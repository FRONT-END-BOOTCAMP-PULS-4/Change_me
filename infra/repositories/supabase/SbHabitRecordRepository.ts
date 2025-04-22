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
            .from('habit_record')
            .select('*');
        
        // 기본 정렬이 없는 경우 날짜 기준으로 정렬
        if (!filter?.sortField) {
            query = query.order('date', { ascending: false });
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
            record.habit_id,
            new Date(record.date)
        )) || [];

        return habitRecords;
    }

    async findById(HabitId: number): Promise<HabitRecord | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habit_record')
            .select('*')
            .eq('habitId', HabitId)
            .single();

        if (error) {
            throw new Error(`Failed to find habit record by ID: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return new HabitRecord(
            data.habit_id,
            new Date(data.date)
        );
    }

    async save(habitRecord: HabitRecord): Promise<HabitRecord> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habit_record')
            .insert({
                habit_id: habitRecord.habitId,
                date: habitRecord.date
            })
            .select('*')
            .single();

        if (error) {
            throw new Error(`Failed to save habit record: ${error.message}`);
        }

        return new HabitRecord(
            data.habit_id,
            new Date(data.date)
        );
    }

    async update(habitRecord: HabitRecord): Promise<HabitRecord> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from('habit_record')
            .update({
                habit_id: habitRecord.habitId,
                date: habitRecord.date
            })
            .eq('habitId', habitRecord.habitId)
            .select("*")
            .single();

        if (error) {
            throw new Error(`Failed to update habit record: ${error.message}`);
        }

        return new HabitRecord(

            data.habit_id,
            new Date(data.date)
        );
    }

    async deleteById(id: number): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase
            .from("habit_record")
            .delete()
            .eq("id", id);
        if (error) {
            throw new Error(
                `Failed to delete habit record with id ${HabitId}: ${error.message}`
            );
        }
    }
  
    async TestExists(record: HabitRecord): Promise<boolean> {
        const supabase = await createClient();
        const { data } = await supabase
            .from("habit_record")
            .select("*")
            .eq("habit_id", record.habitId)
            .eq("date", record.date.toISOString().split("T")[0])
            .maybeSingle();

    async TestSave(record: HabitRecord): Promise<void> {
        const supabase = await createClient();
        
        const { error } = await supabase
            .from('habit_record')
            .insert({
                habit_id: record.habitId,
                date: record.date
            });
            
        if (error) {
            throw new Error(`Failed to save test habit record: ${error.message}`);
        }
    }

    async TestDelete(record: HabitRecord): Promise<void> {
        const supabase = await createClient();
        
        const { error } = await supabase
            .from('habit_record')
            .delete()
            .eq('habit_id', record.habitId)
            .eq('date', record.date);
            
        if (error) {
            throw new Error(`Failed to delete test habit record: ${error.message}`);
        }
    }

    async TestGetTodayCheckedHabitIds(memberId: string, date: Date): Promise<number[]> {
        const supabase = await createClient();
        
        // 오늘 날짜에 기록된 습관 ID 목록을 가져옵니다
        const dateStr = date.toISOString();
        
        // habit_record와 habit 테이블을 조인하는 쿼리
        const { data, error } = await supabase
            .from('habit_record')
            .select(`
                habit_id,
                habit!inner (
                    id, member_id
                )
            `)
            .eq('habit.member_id', memberId)
            .gte('date', new Date(dateStr).setHours(0, 0, 0, 0))
            .lt('date', new Date(dateStr).setHours(23, 59, 59, 999));
            
        if (error) {
            throw new Error(`Failed to get today's checked habit IDs: ${error.message}`);
        }
        
        // 결과에서 habit_id만 추출
        return data.map((item: any) => item.habit_id);
    }

    // 달성률을 계산하기 위해 habit_record 테이블에서 체크된 기록 수를 가져오는 메서드
    async TestCountByHabitId(habitId: number): Promise<number> {
        const supabase = await createClient();

        const { count, error } = await supabase
            .from("habit_record")
            .select("*", { count: "exact", head: true })
            .eq("habit_id", habitId);

        if (error) {
            throw new Error("체크된 기록 수 조회 실패: " + error.message);
        }

        return count || 0;
    }
}
