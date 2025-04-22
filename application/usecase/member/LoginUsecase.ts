import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { LoginDto } from "./dto/LoginDto";
import { signJWT } from "@/utils/jwt";
import bcrypt from "bcrypt";
import { LoggedInDto } from "./dto/LoggedInDto";

export class LoginUsecase {
    constructor(private readonly memberRepository: MemberRepository) {}

    async execute(dto: LoginDto): Promise<LoggedInDto> {
        const member = await this.memberRepository.findByEmail(dto.email);
        if (!member) {
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        if (member.deletedAt !== null) {
            throw new Error("탈퇴한 계정입니다.");
        }

        const isValid = await bcrypt.compare(dto.password, member.password);
        if (!isValid) {
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        const token = await signJWT({
            id: member.id,
            nickname: member.nickname,
            role: member.role,
        });

        return {
            token,
            user: {
                id: member.id,
                name: member.name,
                email: member.email,
                nickname: member.nickname,
                role: member.role,
                imageUrl: member.imageUrl,
            },
        };
    }
}
