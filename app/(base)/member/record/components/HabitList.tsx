"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useHabit } from "@/hooks/useHabit";
import styles from "./HabitList.module.scss";
import Loading from "@/app/components/Loading";

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
};

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

            const res = await fetch(`/api/members/habit/record/view?${params.toString()}`, {
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

    if (habits.length === 0) {
        return <div className={styles.empty}>조회된 습관이 없습니다.</div>;
    }

    return (
        <div>
            <div className={styles.habitGrid}>
                {habits.map((habit) => (
                    <div key={habit.id} className={styles.habitCard}>
                        <h3 className={styles.title}>{habit.name}</h3>
                        <p className={styles.category}>{habit.categoryname}</p>
                        <p className={styles.description}>{habit.description}</p>
                        <div className={styles.details}>
                            <span>기간: {habit.duration}</span>
                            <span>달성률: {habit.rate}%</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* 페이지 네이션 */}
            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    이전
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    다음
                </button>
            </div>
        </div>
    );
}