import { Member } from "../entities/Member";

export interface MemberRepository {
    create(member: Member): Promise<Member>;
    findByEmail(email: string): Promise<Member | null>;
    findById(id: string): Promise<Member | null>;
    isEmailDuplicated(email: string): Promise<boolean>;
    withdraw(id: string): Promise<void>;
    updateProfile(id: string, nickname: string, imageUrl?: string | null): Promise<void>;
    uploadProfileImage(id: string, file: File, oldPath?: string): Promise<{ path: string }>;
}