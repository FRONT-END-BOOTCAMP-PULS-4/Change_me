import { MemberRepository } from "@/domain/repositories/MemberRepository";
import bcrypt from "bcrypt";

export class VerifyPasswordUsecase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(id: string, password: string): Promise<boolean> {
        const member = await this.memberRepository.findById(id);
        if (!member) return false;

        const isValid = await bcrypt.compare(password, member.password);
        return isValid;
    }
}