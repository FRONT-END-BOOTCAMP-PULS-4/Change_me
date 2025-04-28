"use client";
import React from "react";
import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import Image from "next/image";

type MessageListProps = {
    messages: MessageDto[];
    handleUpdate: (id: number, content: string) => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
};

export default function MessageList(props: MessageListProps) {
    return (
        <div className={styles.wrapper}>
            <ol className={styles.list}>
                {props.messages.length === 0 ? (
                    <li className={styles.empty}>
                        <Image
                            src={"/images/Loading.png"}
                            alt="함께해요 이미지"
                            width={200}
                            height={200}
                            className={styles.image}
                            priority={true}
                        />
                        아직 작성된 메시지가 없어요.
                        <br />
                        모두에게 응원의 메시지를 남겨보세요!
                    </li>
                ) : (
                    props.messages.map((message: MessageDto) => (
                        <li className={styles.listItem} key={message.id}>
                            <MessageItem
                                messageDto={message}
                                key={message.id}
                                handleUpdate={props.handleUpdate}
                                handleDelete={props.handleDelete}
                            />
                        </li>
                    ))
                )}
            </ol>
        </div>
    );
}
