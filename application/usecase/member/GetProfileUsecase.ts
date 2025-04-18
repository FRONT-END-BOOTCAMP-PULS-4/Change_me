import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { ProfileDto } from "./dto/GetProfileDto";

export class GetProfileUseCase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(memberId: string): Promise<ProfileDto> {
        const member = await this.memberRepository.findById(memberId as string);
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