"use client";
import React from "react";
import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";

type MessageListProps = {
    messages: MessageDto[];
};

export default function MessageList(props: MessageListProps) {
    return (
        <div className={styles.wrapper}>
            <ol className={styles.list}>
                {props.messages.map((message: MessageDto) => (
                    <MessageItem messageDto={message} key={message.id} />
                ))}
            </ol>
        </div>
    );
}
