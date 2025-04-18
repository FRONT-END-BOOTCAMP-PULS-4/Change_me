import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { Member } from "@/domain/entities/Member";
import bcrypt from "bcrypt";
import { JoinMemberDto } from "./dto/JoinMemberDto";

export class JoinMemberUseCase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(dto: JoinMemberDto): Promise<Member> {
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
            null
        );

        const savedMember = await this.memberRepository.create(newMember);
        return savedMember;
    }
}