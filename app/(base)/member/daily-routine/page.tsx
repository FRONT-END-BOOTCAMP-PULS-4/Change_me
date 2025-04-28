"use client";

import styles from "./page.module.scss";
import HabitList from "./components/HabitList";
import DailyMessage from "./components/DailyMessage";

export default function page() {
    return (
        <div className={styles.page}>
            <HabitList />
            <DailyMessage />
        </div>
    );
}
