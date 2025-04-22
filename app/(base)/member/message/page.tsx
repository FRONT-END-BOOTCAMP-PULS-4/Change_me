"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import MessageList from "./components/MessageList";
import WriteMessageForm from "./components/WriteMessageForm";
import MemberFilterButtons from "./components/MemberFilterButtons";
import Pager from "@/app/components/Pager";
import styles from "./page.module.scss";
import Loading from "@/app/components/Loading";
import { useMessages } from "@/hooks/useMessages";

export default function MessageListPage() {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const mine = Boolean(searchParams.get("mine")) || false;
    const router = useRouter();

    const {
        messages,
        pages,
        endPage,
        isLoading,
        createMessage,
        updateMessage,
        deleteMessage,
    } = useMessages(currentPage, mine);

    const handleQueryStringChange = (newPage: number, newMine: boolean) => {
        router.push(`?currentPage=${newPage}&mine=${newMine}`);
    };

    if (isLoading) return <Loading />;

    return (
        <section className={styles.message}>
            <h2>Daily Message</h2>
            <MemberFilterButtons
                onMineChange={(newMine: boolean) =>
                    handleQueryStringChange(currentPage, newMine)
                }
                mine={mine}
            />
            <WriteMessageForm />
            <MessageList messages={messages} />
            <Pager
                currentPage={1}
                pages={pages}
                endPage={endPage}
                onPageChange={(newPage: number) =>
                    handleQueryStringChange(newPage, mine)
                }
            />
        </section>
    );
}
