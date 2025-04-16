import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { verifyJWT } from "@/utils/jwt";

export const withdrawMemberUseCase = {
    async execute(token: string) {
        const payload = verifyJWT(token);
        if (!payload) throw new Error("인증 실패");

        await memberRepository.withdraw(payload.id);
    },
};