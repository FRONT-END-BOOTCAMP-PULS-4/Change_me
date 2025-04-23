"use client";

import { AnonHabit } from "@/hooks/useAnonHabits";
import React from "react";
import HabitCard from "./HabitCard";
import styles from "./BottomSection.module.scss";

type BottomSectionProps = {
    habits: AnonHabit[];
};

export default function BottomSection({ habits }: BottomSectionProps) {
    return (
        <section className={styles.section}>
            <div className={styles.title}>
                <h3>달성한 습관</h3>
                <p>다른 사람들은 어떤 습관을 달성했는지 확인해보세요.</p>
            </div>
            {habits.length ? (
                <div className={styles.cards}>
                    {habits.map((habit) => (
                        <HabitCard key={habit.id} habit={habit} />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <img src="/images/Facade.png" alt="empty" />
                    <p>아직 달성한 습관이 없습니다.</p>
                </div>
            )}
        </section>
    );
}
