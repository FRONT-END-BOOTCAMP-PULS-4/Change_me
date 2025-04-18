"use client";

import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { getToken, useMemberStore } from "@/stores/memberStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const token = getToken();
        console.log("token", token);

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

            <ol>
                {messages.map((message) => {
                    return (
                        <li key={message.id}>
                            <div>
                                <img
                                    src={message.profileUrl}
                                    width={40}
                                    height={40}
                                />
                                <div>
                                    <strong>{message.writer}</strong>
                                    <span>
                                        {message.createdAt.toISOString()}
                                    </span>
                                </div>
                            </div>

                            <p>{message.content}</p>

                            <div>
                                <button>
                                    {message.isLiked ? "❤️" : "🤍"}{" "}
                                    {message.likeCount}
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </main>
    );
}
