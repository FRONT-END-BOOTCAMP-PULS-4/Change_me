"use client";
import React from "react";
import { useAuthStore } from "@/stores/authStore";
import StatusFilter from "./components/StatusFilter"; // 상태 필터 컴포넌트
import HabitList from "./components/HabitList";
import Pager from "@/app/components/Pager";
import { getToken } from "@/utils/utils";
import {useHabit} from "@/hooks/useHabit";
import {fetcher} from "@/utils/fetcher";
import CategorySelector from "./components/CategorySelector";
import { useRouter, useSearchParams } from "next/navigation";
import TestRecordList from "./components/TestRecordList";



export default function RecordPage() {
    const searchParams = useSearchParams();
    const currentPage: number = Number(searchParams.get("page")) || 1;
    const mine: boolean = searchParams.get("mine") === "true" ? true : false;
    const router = useRouter();
    // 토큰 가져오기
    const token = useAuthStore.getState().token;
    
    const {
        habits,
        totalCount,
        totalPages,
        isLoading,
        } = useHabit(currentPage);
    return (
        <div>

            {/* <CategorySelector /> */}
            <StatusFilter />
            <HabitList />
            {/* <TestRecordList />  */}
        </div>
    )
}


