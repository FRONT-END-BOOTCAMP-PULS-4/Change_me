import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export const checkEmailDuplicateUsecase = {
    async execute(email: string) {
        const isDuplicated = await memberRepository.isEmailDuplicated(email);
        return { isDuplicated };
    },
};