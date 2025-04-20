"use client";
import Pager from "@/app/components/Pager";
import React from "react";
import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";

export default function MessageList(messageListDto: MessageListDto) {
    const { messages, totalCount, endPage, pages } = messageListDto;

    return (
        <div className={styles.wrapper}>
            <ol className={styles.list}>
                {messages.map((message: MessageDto) => (
                    <MessageItem
                        imageUrl={message.imageUrl}
                        writer={message.writer}
                        createdAt={message.createdAt}
                        content={message.content}
                        isLiked={message.isLiked}
                        likeCount={message.likeCount}
                    />
                ))}
            </ol>
            <Pager
                currentPage={1}
                pages={pages}
                endPage={endPage}
                onPageChange={(page: number) => {}}
            />
        </div>
    );
}
