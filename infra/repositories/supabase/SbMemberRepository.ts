import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { Member } from "@/domain/entities/Member";
import { createClient } from "@/utils/supabase/Server";

export class SbMemberRepository implements MemberRepository {
    // 회원가입
    async save(member: Member): Promise<void> {
        const supabase = await createClient();

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
            throw new Error(error?.message || "가입 실패패");
        }
    }

    // 이메일 중복확인
    async isEmailDuplicated(email: string): Promise<boolean> {
        const supabase = await createClient();

        const { data } = await supabase
            .from("member")
            .select("id")
            .eq("email", email)
            .single();

        return !!data;
    }

    // 로그인
    async findByEmail(email: string): Promise<Member | null> {
        const supabase = await createClient();

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
            data.deleted_at ?? null,
        );
    }

    // 프로필 조회
    async findById(id: string): Promise<Member | null> {
        const supabase = await createClient();

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
            data.deleted_at ?? null,
        );
    }

    // 회원 탈퇴
    async withdraw(id: string): Promise<void> {
        const supabase = await createClient();

        const now = new Date().toISOString();
        const { error } = await supabase
            .from("member")
            .update({ deleted_at: now })
            .eq("id", id);

        if (error) {
            throw new Error("회원 탈퇴 실패: " + error.message);
        }
    }

    // 프로필 이미지 변경
    async uploadProfileImage(
        id: string,
        file: File,
        oldPath?: string,
    ): Promise<{ path: string }> {
        const supabase = await createClient();
        const filename = `${id}_${Date.now()}`;

        if (oldPath) {
            const { error: deleteError } = await supabase.storage
                .from("profile-images")
                .remove([oldPath]);

            if (deleteError) {
                console.warn("기존 이미지 삭제 실패:", deleteError);
            }
        }

        const { data, error } = await supabase.storage
            .from("profile-images")
            .upload(filename, file);

        if (error || !data?.path) {
            console.error("업로드 실패:", error);
            throw new Error("이미지 업로드 실패");
        }

        return { path: data.path };
    }

    // 프로필 변경
    async updateProfile(
        id: string,
        nickname: string,
        imageUrl?: string | null,
    ): Promise<void> {
        const supabase = await createClient();

        const updates: Record<string, any> = {
            nickname,
            modified_at: new Date().toISOString(),
        };
        if (imageUrl) {
            updates.image_url = imageUrl;
        }

        const { error } = await supabase
            .from("member")
            .update(updates)
            .eq("id", id);

        if (error) throw new Error("프로필 업데이트 실패");
    }

    // 비밀번호 변경
    async changePassword(id: string, hashedPassword: string): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase
            .from("member")
            .update({ password: hashedPassword })
            .eq("id", id);

        if (error) throw new Error("비밀번호 변경 실패: " + error.message);
    }
}
