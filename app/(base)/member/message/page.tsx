"use client";

import { MessageDto } from "@/application/usecase/message/dto/MessageDto";
import { MessageListDto } from "@/application/usecase/message/dto/MessageListDto";
import { useAuthStore } from "@/stores/authStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import MessageList from "./components/MessageList";
import WriteMessageForm from "./components/WriteMessageForm";
import MemberFilterButtons from "./components/MemberFilterButtons";
import Pager from "@/app/components/Pager";

export default function MessageListPage() {
    // search params initialization
    const searchParams = useSearchParams();
    const currentPageParam = searchParams.get("currentPage");
    const mineParam = searchParams.get("mine");
    const router = useRouter();

    const [mine, setMine] = useState<boolean>(false);
    // page state initialization
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);
    const [endPage, setEndPages] = useState<number>(1);

    // query params initialization
    if (currentPageParam) setCurrentPage(Number(currentPageParam));
    if (mineParam) setMine(mineParam === "true");

    const handlePageChange = (page: number) => {
        router.push(`?currentPage=${currentPage}&mine=${mine}`);
    };

    return (
        <main>
            <header>
                <h1>Daily Message</h1>
                <MemberFilterButtons />
            </header>
            <WriteMessageForm />
            <MessageList />
            <Pager
                currentPage={1}
                pages={pages}
                endPage={endPage}
                onPageChange={(newPage: number) => handlePageChange(newPage)}
            />
        </main>
    );
}
