import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { verifyJWT } from "@/utils/jwt";

export class WithdrawMemberUseCase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(token: string): Promise<void> {
        const payload = await verifyJWT(token);
        if (!payload || typeof payload !== "object" || !("id" in payload)) {
            throw new Error("인증 실패");
        }

        await this.memberRepository.withdraw(payload.id as string);
    }
}