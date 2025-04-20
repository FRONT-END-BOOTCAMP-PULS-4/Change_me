"use client";

import useModalStore from "@/stores/modalStore";
import React from "react";
import styles from "./Title.module.scss";

export default function Title() {
    const { openModal } = useModalStore();

    return (
        <div className={styles.title}>
            <h2>카테고리 관리</h2>
            <button
                className={styles.addBtn}
                onClick={() => openModal("createCategory")}
            >
                <img src="/images/AddIcon.png" alt="추가" />
                <span>새로운 카테고리 추가</span>
            </button>
        </div>
    );
}
