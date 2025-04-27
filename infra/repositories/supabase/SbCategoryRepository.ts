import { Category } from "@/domain/entities/Category";
import { CategoryView } from "@/domain/entities/CategoryView";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CategoryFilter } from "@/domain/repositories/filters/CategoryFilter";
import { createClient } from "@/utils/supabase/Server";

export class SbCategoryRepository implements CategoryRepository {
    async count(): Promise<number> {
        const supabase = await createClient();

        const { count, error } = await supabase.from("category").select("*", {
            count: "exact",
            head: true,
        });

        if (error) {
            throw new Error(`카테고리 개수를 가져올 수 없음: ${error.message}`);
        }

        return count || 0;
    }

    async findAll(filter?: CategoryFilter): Promise<CategoryView[]> {
        const supabase = await createClient();

        let query = supabase
            .from("category_view")
            .select("id, name, habit_count")
            .order("habit_count", { ascending: false })
            .order("id", { ascending: true });

        if (filter) {
            if (filter.offset !== undefined) {
                query.range(
                    filter.offset,
                    filter.offset + (filter.limit || 0) - 1,
                );
            }

            if (filter.popular) {
                query.range(0, 7);
            }
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(`카테고리 조회 실패: ${error.message}`);
        }

        return data.map((category) => {
            return {
                id: category.id,
                name: category.name,
                habitCount: category.habit_count,
            };
        });
    }

    async findById(id: number): Promise<CategoryView | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("category_view")
            .select("*")
            .eq("id", id);

        if (error) {
            throw new Error(`${error.message}`);
        }

        if (data.length === 0) return null;
        return {
            name: data[0].name,
            memberId: data[0].member_id,
            habitCount: data[0].habit_count,
        };
    }

    async save(category: Category): Promise<Category> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("category")
            .insert({
                name: category.name,
                member_id: category.memberId,
            })
            .select()
            .single();

        if (error) {
            if (error.code === "23505") {
                throw new Error(`이미 존재하는 카테고리입니다.`);
            }
            throw new Error(`카테고리 등록 실패: ${error.message}`);
        }

        return {
            id: data.id,
            name: data.name,
            memberId: data.member_id,
        };
    }

    async update(category: Category): Promise<void> {
        const supabase = await createClient();

        const updates: Pick<Category, "name"> = { name: category.name };

        const { error } = await supabase
            .from("category")
            .update(updates)
            .eq("id", category.id)
            .select()
            .single();

        if (error) {
            if (error.code === "23505") {
                throw new Error(`이미 존재하는 카테고리입니다.`);
            }
            throw new Error(`카테고리 수정 실패: ${error.message}`);
        }
    }

    async deleteById(id: number): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase.from("category").delete().eq("id", id);

        if (error) {
            throw new Error(`카테고리 삭제 실패: ${error.message}`);
        }
    }
}
