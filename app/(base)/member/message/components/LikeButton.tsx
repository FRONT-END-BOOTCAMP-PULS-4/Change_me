"use client";

import emptyHeartImage from "@/public/images/EmptyHeart.png";
import fullHeartImage from "@/public/images/FullHeart.png";

import { MessageLikeDto } from "@/application/usecase/message-like/dto/MessageLikeDto";
import { useMessageLikes } from "@/hooks/useMessageLikes";
import Image from "next/image";
import styles from "./LikeButton.module.scss";

type LikeButtonProps = {
    isLiked: Boolean;
    messageLikeDto: MessageLikeDto;
};

export default function LikeButton(props: LikeButtonProps) {
    const iconImage = props.isLiked ? fullHeartImage : emptyHeartImage;
    const messageLikes = useMessageLikes();
    const toggleLike = async () => {
        try {
            if (!props.isLiked) {
                const res = await messageLikes.createMessageLike(
                    props.messageLikeDto.messageId,
                );
                // update values: instead of using setIsLiked, apply the change by editing local variables..?
            } else {
                const res = await messageLikes.deleteMessageLike(
                    props.messageLikeDto.messageId,
                );
                // update values
            }
        } catch (error) {}
    };

    return (
        <button className={styles.button} onClick={toggleLike}>
            <Image src={iconImage} alt="하트 아이콘" width={20} height={20} />
        </button>
    );
}
