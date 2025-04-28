"use client";

import Loading from "@/app/components/Loading";
import Pager from "@/app/components/Pager";
import { useMessages } from "@/hooks/useMessages";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CreateMessageForm from "./CreateMessageForm";
import MemberFilterButtons from "./MemberFilterButtons";
import MessageList from "./MessageList";
import styles from "./DailyMessage.module.scss";

export default function DailyMessage() {
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
            {messages.length > 0 && (
                <Pager
                    currentPage={currentPage}
                    pages={pages}
                    endPage={endPage}
                    onPageChange={(newPage: number) =>
                        handleQueryStringChange(newPage, mine)
                    }
                />
            )}
        </section>
    );
}
