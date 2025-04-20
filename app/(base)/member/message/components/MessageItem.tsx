"use client";

import React from "react";
import styles from "./MessageItem.module.scss";
import EditMessageButton from "./EditMessageButton";
import DeleteMessageButton from "./DeleteMessageButton";
import LikeButton from "./LikeButton";

export type MessageItemProps = {
    writer: string;
    imageUrl: string;
    content: string;
    createdAt: string;
    likeCount: number;
    isLiked: boolean;
};

export default function MessageItem({
    imageUrl,
    writer,
    content,
    createdAt,
    likeCount,
    isLiked,
}: MessageItemProps) {
    const isAuthor = true; // TODO: set the flag
    return (
        <div className="border rounded-md p-4 mb-2 bg-white shadow-sm">
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                    <img
                        src={imageUrl}
                        alt="프로필 이미지"
                        className="w-8 h-8 rounded-full"
                    />
                    <div>
                        <div className="text-sm font-semibold">{writer}</div>
                        <div className="text-xs text-gray-500">{createdAt}</div>
                    </div>
                </div>
                {isAuthor && (
                    <div className="flex space-x-2 text-sm text-gray-500">
                        <EditMessageButton />
                        <DeleteMessageButton />
                    </div>
                )}
            </div>
            <div className="mt-2 text-sm">{content}</div>
            <div className="flex justify-end items-center mt-2 text-sm text-gray-500 space-x-1">
                <LikeButton />
                <span>{likeCount}</span>
            </div>
        </div>
    );
}
