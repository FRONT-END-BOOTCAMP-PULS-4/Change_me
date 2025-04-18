import { MemberRepository } from "@/domain/repositories/MemberRepository";
import { UpdateProfileDto } from "./dto/UpdateProfileDto";

export class UpdateProfileUsecase {
    constructor(private readonly memberRepository: MemberRepository) { }

    async execute(id: string, nickname: string, file?: File): Promise<string | null> {
        let imageUrl: string | null = null;

        if (file) {
            const existingMember = await this.memberRepository.findById(id);
            const oldPath = existingMember?.imageUrl?.split("/").pop();
            const uploadResult = await this.memberRepository.uploadProfileImage(id, file, oldPath);

            if (!uploadResult || !uploadResult.path) {
                throw new Error("이미지 업로드에 실패했습니다.");
            }

            imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${uploadResult.path}`;
        }

        const dto = new UpdateProfileDto(id, nickname, imageUrl || undefined);
        await this.memberRepository.updateProfile(dto.id, dto.nickname!, dto.imageUrl);
        return imageUrl;
    }
}