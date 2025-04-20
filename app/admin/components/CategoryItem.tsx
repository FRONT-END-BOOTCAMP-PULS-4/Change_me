"use client";

import React from "react";
import styles from "./CategoryItem.module.scss";

type CategoryItemProps = {
    name: string;
    habitCount: number;
};

export default function CategoryItem({ name, habitCount }: CategoryItemProps) {
    return (
        <li className={styles.row}>
            <span>{name}</span>
            <span>{habitCount.toLocaleString()}개</span>

            <div
                className={`${habitCount !== 0 && styles.disabled} ${styles.actions}`}
            >
                <button
                    disabled={habitCount !== 0}
                    className={`${styles.edit}`}
                >
                    수정
                </button>
                <button disabled={habitCount !== 0} className={styles.delete}>
                    삭제
                </button>
            </div>
        </li>
    );
}
