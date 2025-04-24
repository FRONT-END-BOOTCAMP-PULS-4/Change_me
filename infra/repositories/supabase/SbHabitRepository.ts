import { TestHabit } from "@/domain/entities/TestHabit";
import { Habit } from "../../../domain/entities/Habit";
import { HabitRepository } from "@/domain/repositories/HabitRepository";
import { HabitFilter } from "@/domain/repositories/filters/HabitFilter";
import { createClient } from "@/utils/supabase/Server";
import { HabitMember } from "@/domain/entities/HabitMember";

export class SbHabitRepository implements HabitRepository {
    private queryFilter(filter: HabitFilter | undefined, query: any) {
        if (filter) {
            if (filter.memberId) {
                query = query.eq("member_id", filter.memberId);
            }
            if (filter.categoryId !== undefined) {
                query = query.eq("category_id", filter.categoryId);
            }
            if (filter.status !== undefined) {
                if (filter.status === 0) {
                    query = query
                        .eq("status", filter.status)
                        .gt(
                            "finished_at",
                            new Date().toISOString().split("T")[0],
                        );
                } else if (filter.status === 1) {
                    query = query
                        .eq("status", 0)
                        .lte(
                            "finished_at",
                            new Date().toISOString().split("T")[0],
                        );
                } else {
                    query = query.eq("status", filter.status);
                }
            }
            if (filter.offset !== undefined) {
                query.range(
                    filter.offset,
                    filter.offset + (filter.limit || 0) - 1,
                );
            }
        }

        return query;
    }

    async count(filter?: HabitFilter): Promise<number> {
        const supabase = await createClient();

        let query = supabase.from("habit").select("*", { count: "exact" });
        query = this.queryFilter(filter, query);

        const { count, error } = await query;

        if (error) {
            throw new Error(`습관 개수 조회 실패: ${error.message}`);
        }

        return count || 0;
    }

    async findAll(filter?: HabitFilter): Promise<HabitMember[]> {
        const supabase = await createClient();

        let query = supabase
            .from("habit")
            .select("*, member(nickname, image_url, deleted_at)")
            .order("created_at", { ascending: false });
        query = this.queryFilter(filter, query);

        const { data } = await query;
        const habits =
            data?.map((habit) => ({
                id: habit.id,
                categoryId: habit.category_id,
                memberId: habit.member_id,
                name: habit.name,
                description: habit.description,
                createdAt: new Date(habit.created_at),
                finishedAt: new Date(habit.finished_at),
                stoppedAt: habit.stopped_at,
                status: habit.status,
                userNickname: habit.member.nickname,
                imageUrl: habit.member.image_url,
                isActive: !habit.member.deleted_at,
            })) || [];

        return habits;
    }

    async findById(id: number): Promise<Habit | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("habit")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            throw new Error("Failed to find habit by ID: ${error.message}");
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
            data.status,
        );
    }

    async save(habit: Habit): Promise<Habit> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("habit")
            .insert({
                category_id: habit.categoryId,
                member_id: habit.memberId,
                name: habit.name,
                description: habit.description,
            })
            .select("*")
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
            data.status,
        );
    }

    async update(habit: Habit): Promise<Habit> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("habit")
            .update({
                member_id: habit.memberId,
                description: habit.description,
                status: habit.status,
                finished_at: habit.finishedAt,
                stopped_at: habit.stoppedAt,
            })
            .eq("id", habit.id)
            .select("*")
            .single();
        if (error) {
            throw new Error("Failed to update habit: ${error.message}");
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
            data.status,
        );
    }

    async deleteById(id: number): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase.from("habit").delete().eq("id", id);
        if (error) {
            throw new Error(
                `failed to delete message with id ${id}: ${error.message}`,
            );
        }
    }

    // [테스트] 습관 등록
    async create(habit: Habit): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase.from("habit").insert({
            category_id: habit.categoryId,
            member_id: habit.memberId,
            name: habit.name,
            description: habit.description,
            created_at: habit.createdAt?.toISOString(),
            finished_at: habit.finishedAt?.toISOString(),
            status: habit.status,
        });

        if (error) {
            throw new Error(`습관 등록 실패: ${error.message}`);
        }
    }

    // [테스트] 습관 조회 (진행 중인 습관)
    async findOngoingByMemberId(memberId: string): Promise<TestHabit[]> {
        const supabase = await createClient();

        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식

        const { data, error } = await supabase
            .from("habit")
            .select("*, category(name)")
            .eq("member_id", memberId)
            .in("status", [0, 3])
            .gte("finished_at", today)
            .order("created_at", { ascending: true });

        if (error) {
            throw new Error(`진행 중인 습관 조회 실패: ${error.message}`);
        }

        return data.map(
            (item) =>
                new TestHabit(
                    item.id,
                    item.category_id,
                    item.member_id,
                    item.name,
                    item.description,
                    new Date(item.created_at),
                    new Date(item.finished_at),
                    item.stopped_at ? new Date(item.stopped_at) : null,
                    item.status,
                    item.category.name,
                ),
        );
    }

    // 습관 삭제
    async deleteById2(habitId: number): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("habit")
            .delete()
            .eq("id", habitId);

        if (error) {
            throw new Error(`습관 삭제 실패: ${error.message}`);
        }
    }

    // 습관 포기
    async giveUpById(habitId: number): Promise<void> {
        const supabase = await createClient();
        const now = new Date().toISOString();
        const { error } = await supabase
            .from("habit")
            .update({
                status: 2,
                stopped_at: now,
            })
            .eq("id", habitId);

        if (error) {
            throw new Error("습관 포기 처리 실패: " + error.message);
        }
    }

    // 습관 수정
    async update2(
        id: number,
        memberId: string,
        categoryId: number,
        name: string,
        description: string,
        finishedAt: string,
    ): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase
            .from("habit")
            .update({
                category_id: categoryId,
                name,
                description,
                finished_at: new Date(finishedAt).toISOString(),
            })
            .eq("id", id)
            .eq("member_id", memberId);

        if (error) {
            throw new Error("습관 수정 실패: " + error.message);
        }
    }

    // 습관ID로 습관 조회
    async findById2(habitId: number): Promise<Habit> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("habit")
            .select("*")
            .eq("id", habitId)
            .single();

        if (error) {
            throw new Error(`습관 조회 실패: ${error.message}`);
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
            data.status,
        );
    }

    // 습관 상태 업데이트
    async updateStatus(habitId: number, status: number): Promise<void> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("habit")
            .update({ status })
            .eq("id", habitId);

        if (error) {
            throw new Error("습관 상태 변경 실패: " + error.message);
        }
    }

    // 습관 조회 (달성한 습관)
    async TestFindSuccessByMemberId(memberId: string): Promise<TestHabit[]> {
        const supabase = await createClient();

        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식

        const { data, error } = await supabase
            .from("habit")
            .select("*, category(name)")
            .eq("member_id", memberId)
            .in("status", [3])
            .lt("finished_at", today);

        if (error) {
            throw new Error(`달성한 습관 조회 실패: ${error.message}`);
        }

        return data.map(
            (item) =>
                new TestHabit(
                    item.id,
                    item.category_id,
                    item.member_id,
                    item.name,
                    item.description,
                    new Date(item.created_at),
                    new Date(item.finished_at),
                    item.stopped_at ? new Date(item.stopped_at) : null,
                    item.status,
                    item.category.name,
                ),
        );
    }

    // 습관 조회 (포기한 습관)
    async TestFindGiveupByMemberId(memberId: string): Promise<TestHabit[]> {
        const supabase = await createClient();

        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식

        const { data, error } = await supabase
            .from("habit")
            .select("*, category(name)")
            .eq("member_id", memberId)
            .in("status", [2]);

        if (error) {
            throw new Error(`포기한 습관 조회 실패: ${error.message}`);
        }

        return data.map(
            (item) =>
                new TestHabit(
                    item.id,
                    item.category_id,
                    item.member_id,
                    item.name,
                    item.description,
                    new Date(item.created_at),
                    new Date(item.finished_at),
                    item.stopped_at ? new Date(item.stopped_at) : null,
                    item.status,
                    item.category.name,
                ),
        );
    }

    // 습관 조회 (실패한 습관)
    async TestFindFailByMemberId(memberId: string): Promise<TestHabit[]> {
        const supabase = await createClient();

        const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식

        const { data, error } = await supabase
            .from("habit")
            .select("*, category(name)")
            .eq("member_id", memberId)
            .in("status", [0])
            .lt("finished_at", today);

        if (error) {
            throw new Error(`실패한 습관 조회 실패: ${error.message}`);
        }

        return data.map(
            (item) =>
                new TestHabit(
                    item.id,
                    item.category_id,
                    item.member_id,
                    item.name,
                    item.description,
                    new Date(item.created_at),
                    new Date(item.finished_at),
                    item.stopped_at ? new Date(item.stopped_at) : null,
                    item.status,
                    item.category.name,
                ),
        );
    }
}
function lt(arg0: string, today: string) {
    throw new Error("Function not implemented.");
}
