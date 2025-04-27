"use client";

import { useRouter, useSearchParams } from "next/navigation";

import MessageList from "./components/MessageList";
import CreateMessageForm from "./components/CreateMessageForm";
import MemberFilterButtons from "./components/MemberFilterButtons";
import Pager from "@/app/components/Pager";
import styles from "./page.module.scss";
import Loading from "@/app/components/Loading";
import { useMessages } from "@/hooks/useMessages";
import React from "react";
import HabitList from "./components/HabitList";

export default function page() {
    const searchParams = useSearchParams();
    const currentPage: number = Number(searchParams.get("currentPage")) || 1;
    const mine: boolean = searchParams.get("mine") === "true" ? true : false;

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
        <div>
            <HabitList />
            <section className={styles.wrapper}>
                <h2>Daily Message</h2>
                <MemberFilterButtons
                    onMineChange={(newMine: boolean) =>
                        handleQueryStringChange(currentPage, newMine)
                    }
                    mine={mine}
                />
                <CreateMessageForm handleSubmit={createMessage} />
                <MessageList
                    messages={messages}
                    handleUpdate={updateMessage}
                    handleDelete={deleteMessage}
                />
                <Pager
                    currentPage={currentPage}
                    pages={pages}
                    endPage={endPage}
                    onPageChange={(newPage: number) =>
                        handleQueryStringChange(newPage, mine)
                    }
                />
            </section>
        </div>
    );
}
