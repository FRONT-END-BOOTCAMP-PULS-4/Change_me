"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { MessageLikeDto } from "@/application/usecase/message-like/dto/MessageLikeDto";

type LikeButtonProps = {
    isLiked: Boolean;
    messageLikeDto: MessageLikeDto;
};

export default function LikeButton(props: LikeButtonProps) {
    const toggleLike = async () => {
        try {
            if (!props.isLiked) {
                const res = await fetch("/api/members/like", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        messageId: props.messageLikeDto.messageId,
                    }),
                });

                const data = await res.json();

                // update values
            } else {
                const res = await fetch(
                    `/api/members/like/${props.messageLikeDto.messageId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data = await res.json();
            }
        } catch (error) {}
    };

    return (
        <button
            onClick={toggleLike}
            style={{ marginTop: "2rem", color: "red" }}
        ></button>
    );
}
