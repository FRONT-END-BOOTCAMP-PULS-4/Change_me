"use client";
import React, { useEffect, useState } from "react";
import styles from "./MessageList.module.scss";
import MessageItem from "./MessageItem";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function MessageList() {
    // search params initialization
    const searchParams = useSearchParams();
    const currentPageParam = searchParams.get("currentPage");
    const mineParam = searchParams.get("mine");
    const [mine, setMine] = useState<Boolean>(false);

    // page state initialization
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);
    const [endPage, setEndPages] = useState<number>(1);

    // query params initialization
    if (currentPageParam) setCurrentPage(Number(currentPageParam));
    if (mineParam) setMine(mineParam === "true");

    const token = useAuthStore((state) => state.token);
    console.log("token", token);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const params = new URLSearchParams();

                // append query parameters to params
                params.append("currentPage", currentPage.toString());
                params.append("mine", mine.toString());

                console.log("params", params.toString());

                // call API
                const response = await fetch(
                    `/api/members/messages?${params.toString()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const data: MessageListDto = await response.json();
                console.log("data", data);

                // update state with the fetched data
                setMessages(data.messages);
                setCurrentPage(data.currentPage);
                setPages(data.pages);
                setEndPages(data.endPage);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        }

        fetchMessages();
    }, [currentPage, mine]);

    return (
        <div className={styles.wrapper}>
            <ol className={styles.list}>
                {messages.map((message: MessageDto) => (
                    <MessageItem messageDto={message} key={message.id} />
                ))}
            </ol>
        </div>
    );
}
