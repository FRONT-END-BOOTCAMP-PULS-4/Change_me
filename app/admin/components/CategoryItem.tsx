"use client";

import React from "react";
import styles from "./CategoryItem.module.scss";

type CategoryItemProps = {
    id: number;
    name: string;
    habitCount: number;
    handleDelete: (id: number) => void;
    handleUpdate: (id: number, name: string) => void;
};

export default function CategoryItem({
    id,
    name,
    habitCount,
    handleDelete,
    handleUpdate,
}: CategoryItemProps) {
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
                <button
                    disabled={habitCount !== 0}
                    className={styles.delete}
                    onClick={() => handleDelete(id)}
                >
                    삭제
                </button>
            </div>
        </li>
    );
}
