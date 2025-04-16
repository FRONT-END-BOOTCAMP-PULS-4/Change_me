import { Member } from "@/domain/entities/Member";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import bcrypt from "bcrypt";

export const joinMemberUseCase = {
    async execute(data: {
        name: string;
        email: string;
        password: string;
        nickname: string;
    }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const now = new Date();

        const newMember = new Member(
            "", // id는 Supabase에서 자동 생성
            data.name,
            data.email,
            hashedPassword,
            data.nickname,
            "",       // imageUrl
            0,        // role
            now,      // createdAt
            null,     // modifiedAt
            null      // deletedAt
        );

        const savedMember = await memberRepository.create(newMember);
        return savedMember;
    },
};