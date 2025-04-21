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

    async TestExists(record: HabitRecord): Promise<boolean> {
        const supabase = await createClient();
        const { data } = await supabase
            .from("habit_record")
            .select("*")
            .eq("habit_id", record.habitId)
            .eq("date", record.date.toISOString().split("T")[0])
            .maybeSingle();

        return !!data;
    }

    async TestSave(record: HabitRecord): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("habit_record").insert({
            habit_id: record.habitId,
            date: record.date.toISOString().split("T")[0],
        });
        if (error) throw new Error("습관 기록 저장 실패: " + error.message);
    }

    async TestDelete(record: HabitRecord): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("habit_record")
            .delete()
            .eq("habit_id", record.habitId)
            .eq("date", record.date.toISOString().split("T")[0]);
        if (error) throw new Error("습관 기록 삭제 실패: " + error.message);
    }

    async TestGetTodayCheckedHabitIds(memberId: string, date: Date): Promise<number[]> {
        const supabase = await createClient();

        // member의 habit id들 먼저 가져오기
        const { data: habitList, error: habitError } = await supabase
            .from("habit")
            .select("id")
            .eq("member_id", memberId);

        if (habitError) {
            throw new Error("습관 ID 조회 실패: " + habitError.message);
        }

        const habitIds = (habitList ?? []).map((habit) => habit.id);

        if (habitIds.length === 0) return [];

        // 해당 habit_id 중 오늘 날짜와 일치하는 record 조회
        const { data: recordList, error: recordError } = await supabase
            .from("habit_record")
            .select("habit_id")
            .eq("date", date.toISOString().split("T")[0])
            .in("habit_id", habitIds);

        if (recordError) {
            throw new Error("체크된 습관 목록 조회 실패: " + recordError.message);
        }

        return (recordList ?? []).map((record) => record.habit_id);
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
