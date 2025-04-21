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
    const [checkedHabits, setCheckedHabits] = useState<{ [habitId: number]: boolean }>({});

    const token = useAuthStore.getState().token;

    // 오늘 날짜 (YYYY-MM-DD)
    const today = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
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
                console.error("불러오기 실패:", error);
            }
        };

        fetchHabits();
    }, []);

    useEffect(() => {
        const fetchCheckedHabits = async () => {
            const res = await fetch("/api/test-habit-records/checked", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (Array.isArray(data.checkedIds)) {
                const state: { [id: number]: boolean } = {};
                data.checkedIds.forEach((id) => (state[id] = true));
                setCheckedHabits(state);
            }
        };

        if (token) fetchCheckedHabits();
    }, [token]);

    const toggleCheckbox = async (habitId: number) => {
        const isChecked = !!checkedHabits[habitId];

        try {
            const res = await fetch("/api/test-habit-records", {
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
            } else {
                const data = await res.json();
                alert(data.error || "처리 실패");
            }
        } catch (error) {
            console.error("체크 처리 실패:", error);
        }
    };

    return (
        <div>
            {habits.map((habit) => (
                <div key={habit.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={checkedHabits[habit.id] || false}
                            onChange={() => toggleCheckbox(habit.id)}
                        />
                        {habit.categoryName} &nbsp;|&nbsp;
                        {habit.name} &nbsp;|&nbsp;
                        {habit.description} &nbsp;|&nbsp;
                        {habit.startAt} &nbsp;|&nbsp;
                        {habit.finishedAt} &nbsp;|&nbsp;
                        {habit.daysPassed}일차 &nbsp;|&nbsp;
                        {habit.rate}
                    </label>
                </div>
            ))}
        </div>
    );
}