"use client";

import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { useAuthStore } from "@/stores/authStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import MessageList from "./components/MessageList";
import WriteMessageForm from "./components/WriteMessageForm";

export default function MessageListPage() {
    // search params initialization
    const searchParams = useSearchParams();
    const currentPageParam = searchParams.get("currentPage");
    const mineParam = searchParams.get("mine");

    // page state initialization
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [mine, setMine] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [pages, setPages] = useState<number[]>([]);

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
                setPages(data.pages);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        }

        fetchMessages();
    }, [currentPage, mine]);

    return (
        <main>
            <header>
                <h1>Daily Message</h1>
                <ol>
                    <li>
                        <button>전체</button>
                    </li>
                    <li>
                        <button>내 메시지</button>
                    </li>
                </ol>
            </header>
            <WriteMessageForm />
            <MessageList messageListDto={{ messages, currentPage }} />
        </main>
    );
}
