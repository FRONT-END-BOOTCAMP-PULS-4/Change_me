"use client";

import emptyHeartImage from "@/public/images/EmptyHeart.png";
import fullHeartImage from "@/public/images/FullHeart.png";

import { MessageLikeDto } from "@/application/usecase/message-like/dto/MessageLikeDto";
import { useMessageLikes } from "@/hooks/useMessageLikes";
import Image from "next/image";
import styles from "./LikeButton.module.scss";
import { memo, useEffect, useState } from "react";

type LikeButtonProps = {
    isLiked: Boolean;
    likeCount: number;
    messageLikeDto: MessageLikeDto;
};

export default function LikeButton(props: LikeButtonProps) {
    // local state to manage the like status
    const [liked, setLiked] = useState(props.isLiked);
    const [count, setCount] = useState(props.likeCount);

    useEffect(() => {
        {
            setLiked(props.isLiked);
            setCount(props.likeCount);
        }
    }, []);
    const messageLikes = useMessageLikes();

    const toggleLike = async () => {
        const newLiked = !liked;

        setLiked(newLiked);
        setCount((prev) => prev + (newLiked ? 1 : -1));

        try {
            if (newLiked) {
                await messageLikes.createMessageLike(
                    props.messageLikeDto.messageId,
                );
            } else {
                await messageLikes.deleteMessageLike(
                    props.messageLikeDto.messageId,
                );
            }
        } catch (error) {
            console.error(`Error toggling like status: ${error}`);
            setLiked(liked);
            setCount((prev) => prev + (newLiked ? -1 : 1));
        }
    };
    const iconImage = liked ? fullHeartImage : emptyHeartImage;

    return (
        <button className={styles.button} onClick={toggleLike}>
            <Image src={iconImage} alt="하트 아이콘" width={20} height={20} />
            <div>{count}</div>
        </button>
    );
}
