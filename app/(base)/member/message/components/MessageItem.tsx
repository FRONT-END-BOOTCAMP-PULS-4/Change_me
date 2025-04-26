"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./MessageItem.module.scss";
import LikeButton from "./LikeButton";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { useAuthStore } from "@/stores/authStore";
import UpdateMessageForm from "./UpdateMessageForm";

type MessageItemProps = {
    messageDto: MessageDto; // TODO: divide Dto and props
    handleUpdate: (id: number, content: string) => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
};

export default function MessageItem(props: MessageItemProps) {
    const { user } = useAuthStore();
    const memberId: string = user?.id || "";

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const messageDto = props.messageDto;
    const isAuthor = memberId === messageDto.memberId;
    const createdAt = new Date(messageDto.createdAt);
    const modified: string = messageDto.modifiedAt !== null ? "(수정됨)" : "";
    const pad = (str: String) => str.toString().padStart(2, "0");
    const formattedDate = `${createdAt.getFullYear()}-${pad(String(createdAt.getMonth() + 1))}-${pad(String(createdAt.getDate()))} ${pad(String(createdAt.getHours()))}:${pad(String(createdAt.getMinutes()))} ${modified}`;

    const messageLikeDto = { messageId: messageDto.id, memberId: memberId };
    const handleUpdate = async (id: number, content: string) => {
        props.handleUpdate(id, content);
        setIsUpdating(false);
    };

    if (isUpdating) {
        return (
            <UpdateMessageForm
                messageDto={messageDto}
                handleSubmit={handleUpdate}
            />
        );
    } else {
        return (
            <div className={styles.wrapper}>
                <nav>
                    <div className={styles.profile}>
                        <Image
                            src={
                                messageDto.imageUrl ||
                                "/images/ProfileCircle.png"
                            }
                            alt="프로필 이미지"
                            width={40}
                            height={40}
                            className={styles.image}
                        />
                        <div className={styles.info}>
                            <div className={styles.writer}>
                                {messageDto.writer}
                            </div>
                            <div className={styles.createdAt}>
                                {formattedDate}
                            </div>
                        </div>
                    </div>
                    {isAuthor && (
                        <div className={styles.buttons}>
                            <button
                                className={styles.button}
                                onClick={() => setIsUpdating(true)}
                            >
                                수정
                            </button>
                            <button
                                className={styles.button}
                                onClick={async () =>
                                    await props.handleDelete(messageDto.id)
                                }
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </nav>
                <div className={styles.content}>{messageDto.content}</div>
                <div className={styles.like}>
                    <LikeButton
                        isLiked={messageDto.isLiked}
                        messageLikeDto={messageLikeDto}
                    />
                    <span>{messageDto.likeCount}</span>
                </div>
            </div>
        );
    }
}
