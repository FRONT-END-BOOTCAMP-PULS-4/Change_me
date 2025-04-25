"use client";

import { useAuthStore } from "@/stores/authStore";
import useModalStore from "@/stores/modalStore";
import { useEffect, useState, useCallback } from "react";
import styles from "./HabitList.module.scss";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import { useToastStore } from "@/stores/toastStore";

type Habit = {
    id: number;
    categoryId: string;
    categoryName: string;
    name: string;
    description: string;
    startAt: string;
    finishedAt: string;
    checkedDays: number;
    totalDays: number;
    rate: string;
    canGiveUp: boolean;
    daysPassed: number;
};

export default function HabitList() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [checkedHabits, setCheckedHabits] = useState<{
        [habitId: number]: boolean;
    }>({});
    const [categories, setCategories] = useState<
        { id: number; name: string }[]
    >([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);

    const token = useAuthStore.getState().token;

    // 오늘 날짜 (YYYY-MM-DD)
    const today = new Date().toISOString().slice(0, 10);

    const fetchHabits = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/members/test-habits/", {
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
    }, [token]);

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

    useEffect(() => {
        const fetchCheckedHabits = async () => {
            const res = await fetch("/api/members/test-habit-records/checked", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (Array.isArray(data.checkedIds)) {
                const state: { [id: number]: boolean } = {};
                data.checkedIds.forEach((id: number) => (state[id] = true));
                setCheckedHabits(state);
            }
        };

        if (token) fetchCheckedHabits();
    }, [token]);

    const toggleCheckbox = async (habitId: number) => {
        const isChecked = !!checkedHabits[habitId];

        try {
            const res = await fetch("/api/members/test-habit-records", {
                method: isChecked ? "DELETE" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    habitId,
                    date: today,
                }),
            });

            if (res.ok) {
                setCheckedHabits((prev) => ({
                    ...prev,
                    [habitId]: !isChecked,
                }));
                await fetchHabits();
            } else {
                const data = await res.json();
                useToastStore.getState().show(data.error || "처리 실패");
            }
        } catch (error) {
            console.error("체크 처리 실패:", error);
        }
    };

    const handleDelete = async (habitId: number) => {
        const confirmDelete = confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/members/test-habits/${habitId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                useToastStore.getState().show("삭제 완료");
                setHabits((prev) =>
                    prev.filter((habit) => habit.id !== habitId),
                );
            } else {
                useToastStore.getState().show(data.error || "삭제 실패");
            }
        } catch (error) {
            console.error("삭제 요청 실패:", error);
        }
    };

    const handleGiveUp = async (habitId: number) => {
        const confirm = window.confirm("정말 이 습관을 포기하시겠습니까?");
        if (!confirm) return;

        try {
            const res = await fetch(
                `/api/members/test-habits/${habitId}/giveup`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const data = await res.json();
            if (res.ok) {
                useToastStore.getState().show("습관을 포기했습니다.");
                setHabits((prev) =>
                    prev.filter((habit) => habit.id !== habitId),
                );
            } else {
                useToastStore.getState().show(data.error || "포기 실패");
            }
        } catch (error) {
            console.error("포기 요청 실패:", error);
        }
    };

    const filteredHabits = habits.filter(
        (habit) =>
            selectedCategoryId === null ||
            Number(habit.categoryId) === selectedCategoryId,
    );

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.topControls}>
                <select
                    value={selectedCategoryId ?? ""}
                    onChange={(e) =>
                        setSelectedCategoryId(
                            e.target.value === ""
                                ? null
                                : Number(e.target.value),
                        )
                    }
                >
                    <option value="">전체</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <div className={styles.today}>{today}</div>

                <button
                    className={styles.createButton}
                    onClick={() =>
                        useModalStore.getState().openModal("habit", {
                            refetchHabits: fetchHabits,
                        })
                    }
                >
                    <Image
                        src="/images/AddIcon.png"
                        alt="추가"
                        width={16}
                        height={16}
                        className={styles.plusIcon}
                    />
                    새로운 습관 생성
                </button>
            </div>

            <div className={styles.habitList}>
                {filteredHabits.length === 0 ? (
                    <div className={styles.empty}>
                        <Image
                            src="/images/DailyRoutineCheck.png"
                            alt="조회된 습관 없음"
                            width={140}
                            height={140}
                            className={styles.emptyImage}
                        />
                        <p>진행 중인 습관이 없습니다.</p>
                    </div>
                ) : (
                    filteredHabits.map((habit) => (
                        <div className={styles.habitCard} key={habit.id}>
                            <div className={styles.category}>
                                {habit.categoryName}
                            </div>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                checked={checkedHabits[habit.id] || false}
                                onChange={() => toggleCheckbox(habit.id)}
                            />
                            <div className={styles.info}>
                                <div
                                    className={styles.title}
                                    title={habit.name}
                                    onClick={() =>
                                        useModalStore
                                            .getState()
                                            .openModal("viewHabit", {
                                                id: habit.id,
                                                name: habit.name,
                                                description: habit.description,
                                            })
                                    }
                                >
                                    {habit.name}
                                </div>
                            </div>
                            {/* <div className={styles.info}>
                                <div
                                    className={styles.desc}
                                    title={habit.description}
                                >
                                    {habit.description}
                                </div>
                            </div> */}
                            <div className={styles.info}>
                                <div className={styles.progress}>
                                    {habit.daysPassed}일차
                                </div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.progress}>
                                    {habit.rate}
                                </div>
                            </div>
                            <div className={styles.actions}>
                                {habit.canGiveUp && (
                                    <button
                                        className={styles.edit}
                                        onClick={() =>
                                            useModalStore
                                                .getState()
                                                .openModal("habit", {
                                                    habit,
                                                    refetchHabits: fetchHabits,
                                                })
                                        }
                                    >
                                        수정
                                    </button>
                                )}
                                {habit.startAt === today && (
                                    <button
                                        className={styles.delete}
                                        onClick={() => handleDelete(habit.id)}
                                    >
                                        삭제
                                    </button>
                                )}
                                {habit.canGiveUp && habit.startAt !== today && (
                                    <button
                                        className={styles.giveup}
                                        onClick={() => handleGiveUp(habit.id)}
                                    >
                                        포기
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
