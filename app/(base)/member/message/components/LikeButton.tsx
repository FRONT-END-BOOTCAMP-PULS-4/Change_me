"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { MessageLikeDto } from "@/application/usecase/message-like/dto/MessageLikeDto";
import { useMessageLikes } from "@/hooks/useMessageLikes";

type LikeButtonProps = {
    isLiked: Boolean;
    messageLikeDto: MessageLikeDto;
};

export default function LikeButton(props: LikeButtonProps) {
    const messageLikes = useMessageLikes();
    const toggleLike = async () => {
        try {
            if (!props.isLiked) {
                const res = messageLikes.createMessageLike(
                    props.messageLikeDto.messageId,
                );
                // update values: instead of using setIsLiked, apply the change by editing local variables..?
            } else {
                const res = messageLikes.deleteMessageLike(
                    props.messageLikeDto.messageId,
                );
                // update values
            }
        } catch (error) {}
    };

    return <button onClick={toggleLike}></button>;
}
