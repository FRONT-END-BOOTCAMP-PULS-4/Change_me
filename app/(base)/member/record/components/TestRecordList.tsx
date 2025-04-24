"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState, useCallback } from "react";
import styles from "./TestRecordList.module.scss";
import Loading from "@/app/components/Loading";
import Image from "next/image";

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

export default function TestRecordList() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusTab, setStatusTab] = useState<"success" | "giveup" | "fail">("success");

    const token = useAuthStore.getState().token;

    // 오늘 날짜 (YYYY-MM-DD)
    const today = new Date().toISOString().slice(0, 10);

    const fetchHabits = useCallback(async () => {
        try {
            setIsLoading(true);
            let url = "/api/members/test-habits/success/";

            if (statusTab === "giveup") {
                url = "/api/members/test-habits/giveup/";
            } else if (statusTab === "fail") {
                url = "/api/members/test-habits/fail/";
            }
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            const habits = Array.isArray(data) ? data : data.habits;
            setHabits(habits);
        } catch (error) {
            console.error("불러오기 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [token, statusTab]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                }
            } catch (error) {
                console.error("카테고리 불러오기 실패:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button
                    className={statusTab === "success" ? styles.activeTab : ""}
                    onClick={() => setStatusTab("success")}
                >
                    달성
                </button>
                <button
                    className={statusTab === "fail" ? styles.activeTab : ""}
                    onClick={() => setStatusTab("fail")}
                >
                    실패
                </button>
                <button
                    className={statusTab === "giveup" ? styles.activeTab : ""}
                    onClick={() => setStatusTab("giveup")}
                >
                    포기
                </button>
            </div>
            <div className={styles.headerRow}>
                <div className={styles.category}>
                    <select
                        value={selectedCategoryId ?? ""}
                        onChange={(e) =>
                            setSelectedCategoryId(e.target.value === "" ? null : Number(e.target.value))
                        }
                    >
                        <option value="">전체</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.info}><div className={styles.title}>습관명</div></div>
                <div className={styles.info}><div className={styles.title}>설명</div></div>
                <div className={styles.info}><div className={styles.title}>시작일</div></div>
                <div className={styles.info}><div className={styles.title}>종료일</div></div>
                <div className={styles.info}><div className={styles.title}>포기일</div></div>
                <div className={styles.info}><div className={styles.title}>기간</div></div>
                <div className={styles.info}><div className={styles.title}>달성률</div></div>
            </div>
            <div className={styles.habitList}>
                {habits.filter(
                    (habit) => selectedCategoryId === null || Number(habit.categoryId) === selectedCategoryId
                ).length === 0 ? (
                    <div className={styles.empty}>
                        <Image
                            src="/images/DailyRoutineCheck.png"
                            alt="조회된 습관 없음"
                            width={140}
                            height={140}
                            className={styles.emptyImage}
                        />
                        <p>조회된 습관이 없습니다.</p>
                    </div>
                ) : (
                    habits
                        .filter(
                            (habit) => selectedCategoryId === null || Number(habit.categoryId) === selectedCategoryId
                        )
                        .map((habit) => (
                            <div className={styles.habitCard} key={habit.id}>
                                <div className={styles.category}>{habit.categoryName}</div>
                                <div className={styles.info}>
                                    <div className={styles.title}>{habit.name}</div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.desc}>{habit.description}</div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.desc}>{habit.startAt}</div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.desc}>{habit.finishedAt}</div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.desc}>{habit.stoppedAt ? habit.stoppedAt : "-"}</div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.desc}>{habit.duration}일</div>
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.progress}>{habit.rate}</div>
                                </div>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
}