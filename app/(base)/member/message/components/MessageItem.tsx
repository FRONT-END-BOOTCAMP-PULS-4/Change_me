"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./MessageItem.module.scss";
import MessageButton from "./MessageButton";
import LikeButton from "./LikeButton";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { useAuthStore } from "@/stores/authStore";

type MessageItemProps = {
    messageDto: MessageDto; // TODO: divide Dto and props
};

export default function MessageItem(props: MessageItemProps) {
    const { user } = useAuthStore();
    const memberId: string = user?.id || "";

    const messageDto = props.messageDto;
    const isAuthor = memberId === messageDto.memberId;
    const createdAt = new Date(messageDto.createdAt);
    const kst = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
    const pad = (str: String) => str.toString().padStart(2, "0");
    const formattedDate = `${kst.getFullYear()}-${pad(String(kst.getMonth() + 1))}-${pad(String(kst.getDate()))} ${pad(String(kst.getHours()))}:${pad(String(kst.getMinutes()))}`;

    const messageLikeDto = { messageId: messageDto.id, memberId: memberId };

    return (
        <div className={styles.wrapper}>
            <div className="flex justify-between items-start">
                <nav className="flex items-center space-x-2">
                    <Image
                        src={messageDto.imageUrl || "/images/ProfileCircle.png"}
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
                        <MessageButton type="Edit" />
                        <MessageButton type="Delete" />
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
