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
        // 비밀번호 해시
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // 해시된 비밀번호로 새로운 Member 생성
        const newMember = Member.create({
            ...data,
            password: hashedPassword,
        });
        const savedMember = await memberRepository.create(newMember);
        return savedMember;
    },
};