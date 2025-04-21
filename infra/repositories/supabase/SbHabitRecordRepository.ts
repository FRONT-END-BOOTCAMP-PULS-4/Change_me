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
}