import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { verifyJWT } from "@/utils/jwt";
import { ProfileDto } from "./dto/GetProfileDto";

export class GetProfileUseCase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(token: string): Promise<ProfileDto> {
        const payload = await verifyJWT(token);

        if (!payload || typeof payload !== "object" || !("id" in payload)) {
            throw new Error("인증 실패");
        }

        const member = await this.memberRepository.findById(payload.id as string);
        if (!member) throw new Error("사용자 없음");

        return new ProfileDto(
            member.id,
            member.name,
            member.email,
            member.nickname,
            member.createdAt.toISOString(),
            member.imageUrl
        );
    }
}