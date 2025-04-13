import { Member } from "../entities/Member";

export interface MemberRepository {
    findAll(): Promise<Member[]>;
    findById(id: string): Promise<Member | null>;
    save(member: Member): Promise<Member>;
    update(member: Member): Promise<Member>;
    deleteById(id: string): Promise<void>;
}
