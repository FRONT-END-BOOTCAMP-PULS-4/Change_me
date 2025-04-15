import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { Member } from "@/domain/entities/Member";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // write 권한
);

export const memberRepository: MemberRepository = {
    async create(member: Member): Promise<Member> {
        const { data, error } = await supabase.from("member").insert({
            name: member.props.name,
            email: member.props.email,
            password: member.props.password, // 실제로는 해시처리 필요
            nickname: member.props.nickname,
            created_at: member.props.createdAt?.toISOString(),
        }).select().single();

        if (error) throw new Error(error.message);

        return Member.create({ ...data });
    },

    async findByEmailAndPassword(email, password) {
        const { data, error } = await supabase
            .from("member")
            .select("*")
            .eq("email", email)
            .eq("password", password) // 실제로는 bcrypt 등 해시 비교해야 안전함!
            .single();

        if (error || !data) return null;
        return Member.fromDB(data);
    },
};