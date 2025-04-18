import { MemberRepository } from "@/domain/repositories/MemberRepository";

export class CheckEmailDuplicateUsecase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(email: string): Promise<{ isDuplicated: boolean }> {
        const isDuplicated = await this.memberRepository.isEmailDuplicated(email);
        return { isDuplicated };
    }
}