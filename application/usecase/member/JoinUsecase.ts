import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { Member } from "@/domain/entities/Member";
import bcrypt from "bcrypt";
import { JoinDto } from "./dto/JoinDto";

export class JoinUsecase {
    constructor(private readonly memberRepository: MemberRepository) {}

    async execute(dto: JoinDto): Promise<void> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const now = new Date();

        const newMember = new Member(
            "",
            dto.name,
            dto.email,
            hashedPassword,
            dto.nickname,
            null,
            0,
            now,
            null,
            null,
        );

        await this.memberRepository.save(newMember);
    }
}
