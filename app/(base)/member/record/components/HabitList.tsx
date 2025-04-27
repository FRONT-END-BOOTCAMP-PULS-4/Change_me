"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useHabit } from "@/hooks/useHabit";
import styles from "./HabitList.module.scss";
import Loading from "@/app/components/Loading";
import Pager from "@/app/components/Pager";

type Habit = {
    id: number;
    categoryId: string;
    categoryName: string;
    name: string;
    description: string;
    startAt: string;
    finishedAt: string;
    stoppedAt: string;
    duration: number;
    rate: string;
    status: number;
};

export interface PagerProps {
    currentPage: number;
    totalPages: number; // Added totalPages property
    totalCount: number;
    onPageChange: (newPage: number) => any;
}

export default function HabitList() {
    const [habits, setHabits] = useState<Habit[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
    const [status, setStatus] = useState<number | null>(null); // 상태 필터
    const [categoryId, setCategoryId] = useState<number | null>(null); // 카테고리 필터

    const token = useAuthStore.getState().token;

    const fetchHabits = useCallback(async () => {
        try {
            setIsLoading(true);

            // URLSearchParams를 사용하여 쿼리 문자열 생성
            const params = new URLSearchParams();
            if (status !== null) params.append("status", String(status));
            if (categoryId !== null) params.append("category", String(categoryId));
            params.append("currentPage", String(currentPage));

            const res = await fetch(`/api/members/habits/view?${params.toString()}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            const habits = Array.isArray(data) ? data : data.habits;
            setHabits(habits);
        } catch (error) {
            console.error("습관 데이터를 가져오는 중 오류 발생:", error);
        } finally {
            setIsLoading(false); // 로딩 상태 해제
        }
    }, [token, currentPage, status, categoryId]); // 의존성 배열에 필터 추가

    useEffect(() => {
        fetchHabits(); // fetchHabits 함수 호출
    }, [fetchHabits]); // fetchHabits가 변경될 때 실행

    if (isLoading) return <Loading />; // 로딩 중일 때 표시

    return (
        <div>
            <div className={styles.habitGrid}>
                <div className={styles.info}>
                    <div className={styles.title}>습관명</div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>설명</div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>시작일</div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>종료일</div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>포기일</div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>기간</div>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>달성률</div>
                </div>
            </div>
            <div className={styles.habitList}>
                {habits && habits
                    .filter(
                        (habit) =>
                            (categoryId === null || Number(habit.categoryId) === categoryId) &&
                            (status === null || Number(habit.status) === status)
                    )
                    .map((habit) => (
                        <div key={habit.id} className={styles.habitGrid}>
                            <div className={styles.info}>
                                <div className={styles.title}>{habit.name}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>{habit.description}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>{habit.startAt}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>{habit.finishedAt}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>{habit.stoppedAt}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>{habit.duration}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.title}>{habit.rate}</div>
                            </div>
                        </div>
                    ))
            </div>
            <div className={styles.pager}>
                <Pager
                    currentPage={currentPage}
                    totalPages={Math.ceil(habits.length / 10)} // 페이지 수 계산 (예: 10개씩 보여준다고 가정)
                    totalCount={habits.length} // 총 습관 수
                    onPageChange={(page) => setCurrentPage(page)} // 페이지 변경 핸들러
                />  
    );
}