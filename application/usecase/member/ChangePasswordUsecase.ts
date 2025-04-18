import { MemberRepository } from "@/domain/repositories/MemberRepository";
import bcrypt from "bcrypt";

export class ChangePasswordUsecase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(id: string, newPassword: string): Promise<void> {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
        if (!passwordRegex.test(newPassword)) {
            throw new Error(
                "비밀번호는 8~16자이며, 영문/숫자/특수문자를 모두 포함해야 합니다."
            );
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        await this.memberRepository.changePassword(id, hashed);
    }
}