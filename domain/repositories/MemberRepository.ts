import { Member } from "../entities/Member";

export interface MemberRepository {
    create(member: Member): Promise<Member>;
    isEmailDuplicated(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<Member | null>;
    findById(id: string): Promise<Member | null>;
    withdraw(id: string): Promise<void>;
    uploadProfileImage(id: string, file: File, oldPath?: string): Promise<{ path: string }>;
    updateProfile(id: string, nickname: string, imageUrl?: string | null): Promise<void>;
    changePassword(id: string, hashedPassword: string): Promise<void>;
}