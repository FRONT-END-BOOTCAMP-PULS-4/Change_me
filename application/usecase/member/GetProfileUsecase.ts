import { verifyJWT } from "@/utils/jwt";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export const getProfileUseCase = {
    async execute(token: string) {
        const payload = verifyJWT(token);
        if (!payload || typeof payload !== "object" || !("id" in payload)) {
            throw new Error("인증 실패");
        }

        const member = await memberRepository.findById(payload.id as string);
        if (!member) throw new Error("사용자 없음");

        return {
            id: member.id,
            name: member.name,
            email: member.email,
            nickname: member.nickname,
            imageUrl: member.imageUrl,
            createdAt: member.createdAt.toISOString(),
        };
    },
};