// export class GetProfile {
//     constructor(private memberId: string) {}

//     async execute(): Promise<GetProfileDTO> {
//         // Logic to retrieve the member's profile information
//         // This is a placeholder for the actual implementation
//         const profileData = await this.fetchProfileData(this.memberId);
//         return new GetProfileDTO(profileData);
//     }

//     private async fetchProfileData(memberId: string): Promise<any> {
//         // Placeholder for fetching profile data from a database or API
//         return {
//             id: memberId,
//             name: "John Doe",
//             email: "john.doe@example.com",
//             // other profile fields...
//         };
//     }
// }

import { verifyJWT } from "@/utils/jwt";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export const getProfileUseCase = {
    async execute(token: string) {
        const payload = verifyJWT(token);
        if (!payload) throw new Error("인증 실패");

        const member = await memberRepository.findById(payload.id);
        if (!member) throw new Error("사용자 없음");

        return {
            id: member.props.id,
            name: member.props.name,
            email: member.props.email,
            nickname: member.props.nickname,
            createdAt: member.props.createdAt,
        };
    },
};