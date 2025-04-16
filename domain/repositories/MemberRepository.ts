import { Member } from "../entities/Member";

export interface MemberRepository {
    create(member: Member): Promise<Member>;
    findByEmail(email: string): Promise<Member | null>;
    findById(id: string): Promise<Member | null>;
    isEmailDuplicated(email: string): Promise<boolean>;
    withdraw(id: string): Promise<void>;
}