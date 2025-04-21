import { HabitRecordRepository } from "@/domain/repositories/HabitRecordRepository";
import { HabitRecord } from "@/domain/entities/HabitRecord";
import { createClient } from "@/utils/supabase/Server";

export class SbHabitRecordRepository implements HabitRecordRepository {
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
}