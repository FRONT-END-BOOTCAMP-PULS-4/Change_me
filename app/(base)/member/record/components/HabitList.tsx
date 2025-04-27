"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useHabit } from "@/hooks/useHabit";
import styles from "./HabitList.module.scss";
import Loading from "@/app/components/Loading";

export default function HabitList() {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
    const { habits: initialHabits, isLoading: initialLoading, totalPages } = useHabit(currentPage); // useHabit 훅 호출
    const [isLoading, setIsLoading] = useState(initialLoading); // 로딩 상태 관리
    const [habits, setHabits] = useState(initialHabits); // habits를 상태로 관리

    const token = useAuthStore.getState().token;

    // currentPage가 변경될 때 데이터를 다시 가져옴
        const fetchHabits = useCallback(async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/members/habit/record/view?currentPage=${currentPage}`, {
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
        }, [token, currentPage]); // token과 currentPage가 변경될 때마다 fetchHabits 함수 재생성

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