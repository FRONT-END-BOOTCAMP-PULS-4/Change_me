"use client";
import Pager from "@/app/components/Pager";
import React from "react";
import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";

type MessageListProps = {
    messageListDto: MessageListDto;
};

export default function MessageList(props: MessageListProps) {
    const { messages, totalCount, endPage, pages } = props.messageListDto;

    return (
        <div className={styles.wrapper}>
            <ol className={styles.list}>
                {messages.map((message: MessageDto) => (
                    <MessageItem messageDto={message} />
                ))}
            </ol>
            {/* <Pager
                currentPage={1}
                pages={pages}
                endPage={endPage}
                onPageChange={(page: number) => {}}
            /> */}
        </div>
    );
}
