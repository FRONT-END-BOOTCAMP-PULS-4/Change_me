// export class LoginMember {
//     constructor(private email: string, private password: string) {}

//     public async execute(): Promise<void> {
//         // Logic for logging in the member
//         // This could involve validating the credentials,
//         // interacting with a database, and managing sessions.
//     }
// }

import { LoginMemberDTO } from "./Dto/LoginMemberDTO";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export const loginMemberUseCase = {
    async execute({ email, password }: LoginMemberDTO) {
        const member = await memberRepository.findByEmailAndPassword(email, password);
        if (!member) {
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        // 토큰 발급 또는 세션 설정은 여기에 (선택)
        return {
            id: member.props.id,
            name: member.props.name,
            nickname: member.props.nickname,
        };
    },
};