import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { verifyJWT } from "@/utils/jwt";

export class WithdrawUsecase {
    constructor(private readonly memberRepository: MemberRepository) {}

    async execute(memberId: string): Promise<void> {
        await this.memberRepository.withdraw(memberId as string);
    }
}
