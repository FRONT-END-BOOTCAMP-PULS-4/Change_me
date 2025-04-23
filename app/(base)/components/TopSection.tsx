"use client";

import { AnonHabitResponseType } from "@/hooks/useAnonHabits";
import React from "react";
import styles from "./TopSection.module.scss";

type TopSectionProps = {
    countInfo: Omit<AnonHabitResponseType, "habits">;
    category: string;
};

export default function TopSection({ countInfo, category }: TopSectionProps) {
    return (
        <section className={styles.section}>
            <ul className={styles.records}>
                <li className={styles.record}>
                    지금까지 등록된{" "}
                    <span className={styles.category}>{category}</span> 습관의
                    개수는 <span>{countInfo.totalCount}</span>
                    개예요!
                </li>
                <li>
                    현재 진행 중인{" "}
                    <span className={styles.category}>{category}</span> 습관의
                    개수는 <span>{countInfo.ongoingCount}</span>
                    개예요!
                </li>
                <li>
                    지금까지 달성한{" "}
                    <span className={styles.category}>{category}</span> 습관의
                    개수는 <span>{countInfo.successCount}</span>개예요!
                </li>
                <li>
                    지금까지 실패한{" "}
                    <span className={styles.category}>{category}</span> 습관의
                    개수는 <span>{countInfo.failureCount}</span>개예요!
                </li>
            </ul>
        </section>
    );
}
