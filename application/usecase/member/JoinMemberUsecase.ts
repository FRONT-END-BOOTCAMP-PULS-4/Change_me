import { Member } from "@/domain/entities/Member";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import bcrypt from "bcrypt";
import { JoinMemberDto } from "./dto/JoinMemberDto";

export const joinMemberUseCase = {
    async execute(dto: JoinMemberDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const now = new Date();

        const newMember = new Member(
            "", // id는 Supabase에서 자동 생성
            dto.name,
            dto.email,
            hashedPassword,
            dto.nickname,
            null,     // imageUrl
            0,        // role
            now,      // createdAt
            null,     // modifiedAt
            null      // deletedAt
        );

        const savedMember = await memberRepository.create(newMember);
        return savedMember;
    },
};