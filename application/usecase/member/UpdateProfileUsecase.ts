import { memberRepository } from "@/infra/repositories/supabase/SbMemberRepository";
import { UpdateProfileDto } from "./dto/UpdateProfileDto";

export const updateProfileUsecase = {
    async execute(id: string, nickname: string, file?: File) {
        try {
            let imageUrl: string | null = null;

            if (file) {
                const existingMember = await memberRepository.findById(id);
                const oldPath = existingMember?.imageUrl?.split("/").pop();
                const uploadResult = await memberRepository.uploadProfileImage(id, file, oldPath);

                if (!uploadResult || !uploadResult.path) {
                    throw new Error("이미지 업로드에 실패했습니다.");
                }

                imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${uploadResult.path}`;
            }

            const dto = new UpdateProfileDto(id, nickname, imageUrl || undefined);
            await memberRepository.updateProfile(dto.id, dto.nickname!, dto.imageUrl);
            return imageUrl;
        } catch (err) {
            console.error("프로필 업데이트 실패:", err);
            throw err;
        }
    },
};