"use client";
import React, { useEffect, useState } from "react";
import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

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
