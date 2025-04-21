"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

type Habit = {
    id: number;
    categoryId: string;
    categoryName: string;
    name: string;
    description: string;
    startAt: string;
    finishedAt: string;
    daysPassed: number;
    totalDays: number;
    rate: string;
};

export default function HabitList() {
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const token = useAuthStore.getState().token;

                const res = await fetch("/api/test-habits/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                const habits = Array.isArray(data) ? data : data.habits;
                setHabits(habits);
            } catch (error) {
                console.error("습관 불러오기 실패:", error);
            }
        };

        fetchHabits();
    }, []);

    if (habits.length === 0) return <p>진행 중인 습관이 없습니다.</p>;

    return (
        <div style={{ marginTop: "2rem" }}>
            {habits.map((habit) => (
                <div key={habit.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
                    <h3 style={{ marginBottom: "0.5rem" }}>
                        {habit.name}{" "}
                        <span style={{ fontSize: "0.9rem", color: "gray" }}>({habit.categoryName})</span>
                    </h3>
                    <p>{habit.description}</p>

                    <div style={{ lineHeight: "1.8" }}>
                        <p><strong>시작일:</strong> {habit.startAt}</p>
                        <p><strong>종료일:</strong> {habit.finishedAt}</p>
                        <p><strong>진행일:</strong> {habit.daysPassed}일차</p>
                        <p><strong>달성률:</strong> {habit.rate}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}