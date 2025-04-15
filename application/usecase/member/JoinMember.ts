// export class JoinMember {
//     constructor(
//         public name: string,
//         public email: string,
//         public password: string
//     ) {}

//     public async execute(): Promise<void> {
//         // Logic for joining a new member goes here
//         // This could involve validating the input,
//         // checking if the email is already in use,
//         // and saving the member to the database.
//     }
// }

import { Member } from "@/domain/entities/Member";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";

export const joinMemberUseCase = {
    async execute(data: {
        name: string;
        email: string;
        password: string;
        nickname: string;
    }) {
        const newMember = Member.create(data); // 도메인에서 validation 처리할 수도 있음
        const savedMember = await memberRepository.create(newMember);
        return savedMember;
    },
};