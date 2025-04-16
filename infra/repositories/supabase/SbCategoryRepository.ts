import { Category } from "@/domain/entities/Category";
import { CategoryView } from "@/domain/entities/CategoryView";
import { CategoryRepository } from "@/domain/repositories/CategoryRepository";
import { CategoryFilter } from "@/domain/repositories/filters/CategoryFilter";
import { createClient } from "@/utils/supabase/Server";

export class SbCategoryRepository implements CategoryRepository {
    async count(): Promise<number> {
        const supabase = await createClient();

        const { count, error, data } = await supabase
            .from("category")
            .select("*", {
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
            .order("habit_count", { ascending: false });

        if (filter) {
            if (filter.offset !== undefined) {
                query.range(
                    filter.offset,
                    filter.offset + (filter.limit || 0) - 1,
                );
            }

            if (filter.popular) {
                query.range(0, 9);
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

    async findByName(name: string): Promise<Category | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("category")
            .select("*")
            .eq("name", name)
            .single();

        if (error) {
            throw new Error(
                `이름(${name})으로 카테고리 조회 실패: ${error.message}`,
            );
        }

        if (!data) return null;

        return {
            ...data,
            memberId: data.member_id,
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
            throw new Error(`카테고리 등록 실패: ${error.message}`);
        }

        return {
            ...data,
            memberId: data.member_id,
        };
    }

    async update(category: Category): Promise<Category> {
        const supabase = await createClient();

        const updates: Pick<Category, "name"> = { name: category.name };

        const { data, error } = await supabase
            .from("category")
            .update(updates)
            .eq("id", category.id)
            .select()
            .single();

        if (error) {
            throw new Error(`카테고리 수정 실패: ${error.message}`);
        }

        return {
            ...data,
            memberId: data.member_id,
        };
    }

    async deleteById(id: number): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase.from("category").delete().eq("id", id);

        if (error) {
            throw new Error(`카테고리 삭제 실패: ${error.message}`);
        }
    }
}
