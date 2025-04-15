// import { Member } from "../entities/Member";

// export interface MemberRepository {
//     findAll(): Promise<Member[]>;
//     findById(id: string): Promise<Member | null>;
//     save(member: Member): Promise<Member>;
//     update(member: Member): Promise<Member>;
//     deleteById(id: string): Promise<void>;
// }

import { Member } from "../entities/Member";

export interface MemberRepository {
    create(member: Member): Promise<Member>;
    findByEmailAndPassword(email: string, password: string): Promise<Member | null>;
    findById(id: string): Promise<Member | null>;
}