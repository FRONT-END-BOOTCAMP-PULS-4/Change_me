"use client";

import React from "react";
import Image from "next/image";
import styles from "./MessageItem.module.scss";
import LikeButton from "./LikeButton";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { useAuthStore } from "@/stores/authStore";

type MessageItemProps = {
    messageDto: MessageDto; // TODO: divide Dto and props
    handleUpdate: (id: number, content: string) => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
};

export default function MessageItem(props: MessageItemProps) {
    const isUpdating: boolean = false; //

    const { user } = useAuthStore();
    const memberId: string = user?.id || "";

    const messageDto = props.messageDto;
    const isAuthor = memberId === messageDto.memberId;
    const createdAt = new Date(messageDto.createdAt);
    const pad = (str: String) => str.toString().padStart(2, "0");
    const formattedDate = `${createdAt.getFullYear()}-${pad(String(createdAt.getMonth() + 1))}-${pad(String(createdAt.getDate()))} ${pad(String(createdAt.getHours()))}:${pad(String(createdAt.getMinutes()))}`;

    const messageLikeDto = { messageId: messageDto.id, memberId: memberId };

    if (isUpdating) {
        return;
    } else {
        return (
            <div className={styles.wrapper}>
                <div className="flex justify-between items-start">
                    <nav className="flex items-center space-x-2">
                        <Image
                            src={
                                messageDto.imageUrl ||
                                "/images/ProfileCircle.png"
                            }
                            alt="프로필 이미지"
                            width={40}
                            height={40}
                            className="w-8 h-8 rounded-full"
                        />
                        <div>
                            <div className="text-sm font-semibold">
                                {messageDto.writer}
                            </div>
                            <div className="text-xs text-gray-500">
                                {formattedDate}
                            </div>
                        </div>
                    </nav>
                    {isAuthor && (
                        <div className="flex space-x-2 text-sm text-gray-500">
                            <button
                                className={styles.button}
                                onClick={() =>
                                    props.handleUpdate(
                                        messageDto.id,
                                        messageDto.content,
                                    )
                                }
                            >
                                수정
                            </button>
                            <button
                                className={styles.button}
                                onClick={() =>
                                    props.handleDelete(messageDto.id)
                                }
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>
                <div className="mt-2 text-sm">{messageDto.content}</div>
                <div className="flex justify-end items-center mt-2 text-sm text-gray-500 space-x-1">
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
