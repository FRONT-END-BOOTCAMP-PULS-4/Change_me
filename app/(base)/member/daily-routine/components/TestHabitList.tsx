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
        <div>
            {habits.map((habit) => (
                <div key={habit.id}>
                    <p>
                        {habit.categoryName} &nbsp;|&nbsp;
                        {habit.name} &nbsp;|&nbsp;
                        {habit.description} &nbsp;|&nbsp;
                        {habit.startAt} &nbsp;|&nbsp;
                        {habit.finishedAt} &nbsp;|&nbsp;
                        {habit.daysPassed}일차 &nbsp;|&nbsp;
                        {habit.rate}
                    </p>
                </div>
            ))}
        </div>
    );
}