import { LoginMemberDTO } from "./Dto/LoginMemberDTO";
import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { signJWT } from "@/utils/jwt";
import bcrypt from "bcrypt";

export const loginMemberUseCase = {
    async execute({ email, password }: LoginMemberDTO) {
        const member = await memberRepository.findByEmail(email);
        if (!member) {
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        const isValid = await bcrypt.compare(password, member.props.password);
        if (!isValid) {
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        const token = signJWT({
            id: member.props.id,
            nickname: member.props.nickname,
        });

        return {
            token,
            user: {
                id: member.props.id,
                name: member.props.name,
                nickname: member.props.nickname,
            },
        };
    },
};