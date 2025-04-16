import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { Member } from "@/domain/entities/Member";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const memberRepository: MemberRepository = {
    async create(member: Member): Promise<Member> {
        const { data, error } = await supabase
            .from("member")
            .insert({
                name: member.name,
                email: member.email,
                password: member.password,
                nickname: member.nickname,
                image_url: null,
                role: member.role,
                created_at: member.createdAt.toISOString(),
                modified_at: null,
                deleted_at: null,
            })
            .select()
            .single();

        if (error || !data) {
            throw new Error(error?.message || "회원 생성 실패");
        }

        return new Member(
            data.id,
            data.name,
            data.email,
            data.password,
            data.nickname,
            data.image_url ?? null,
            data.role,
            new Date(data.created_at),
            data.modified_at ?? null,
            data.deleted_at ?? null
        );
    },

    async findByEmail(email: string) {
        const { data, error } = await supabase
            .from("member")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !data) return null;

        return new Member(
            data.id,
            data.name,
            data.email,
            data.password,
            data.nickname,
            data.image_url ?? null,
            data.role,
            new Date(data.created_at),
            data.modified_at ?? null,
            data.deleted_at ?? null
        );
    },

    async findById(id: string) {
        const { data, error } = await supabase
            .from("member")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) return null;

        return new Member(
            data.id,
            data.name,
            data.email,
            data.password,
            data.nickname,
            data.image_url ?? null,
            data.role,
            new Date(data.created_at),
            data.modified_at ?? null,
            data.deleted_at ?? null
        );
    },

    isEmailDuplicated: async (email: string) => {
        const { data } = await supabase
            .from("member")
            .select("id")
            .eq("email", email)
            .single();

        return !!data; // data가 있으면 true (중복)
    },

    withdraw: async (id: string) => {
        const now = new Date().toISOString();
        const { error } = await supabase
            .from("member")
            .update({ deleted_at: now })
            .eq("id", id);

        if (error) throw new Error(error.message);
    },
};