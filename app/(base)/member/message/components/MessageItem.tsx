"use client";

import React from "react";
import styles from "./MessageItem.module.scss";
import EditMessageButton from "./EditMessageButton";
import DeleteMessageButton from "./DeleteMessageButton";
import LikeButton from "./LikeButton";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";

type MessageItemProps = {
    messageDto: MessageDto;
};

export default function MessageItem(props: MessageItemProps) {
    const messageDto = props.messageDto;

    const [memberId, setMemberId] = useState<string>("");

    const isAuthor = memberId === messageDto.memberId; // TODO: set the flag
    const kst = new Date(messageDto.createdAt.getTime() + 9 * 60 * 60 * 1000);
    const pad = (str: String) => str.toString().padStart(2, "0");
    const formattedDate = `${kst.getFullYear()}-${pad(String(kst.getMonth() + 1))}-${pad(String(kst.getDate()))} ${pad(String(kst.getHours()))}:${pad(String(kst.getMinutes()))}`;

    const messageLikeDto = { messageId: messageDto.id, memberId: memberId };

    return (
        <div className="border rounded-md p-4 mb-2 bg-white shadow-sm">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                    <img
                        src={messageDto.imageUrl}
                        alt="프로필 이미지"
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
                </div>
                {isAuthor && (
                    <div className="flex space-x-2 text-sm text-gray-500">
                        <EditMessageButton />
                        <DeleteMessageButton />
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
