"use client";
import React from "react";
import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";

type MessageListProps = {
    messages: MessageDto[];
    handleUpdate: (id: number, content: string) => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
};

export default function MessageList(props: MessageListProps) {
    return (
        <div className={styles.wrapper}>
            <ol className={styles.list}>
                {props.messages.map((message: MessageDto) => (
                    <li className={styles.listItem} key={message.id}>
                        <MessageItem
                            messageDto={message}
                            key={message.id}
                            handleUpdate={props.handleUpdate}
                            handleDelete={props.handleDelete}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
}
