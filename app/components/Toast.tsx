"use client";

import { useToastStore } from "@/stores/toastStore";
import styles from "./Toast.module.scss";

export default function Toast() {
    const message = useToastStore((state) => state.message);

    if (!message) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.warning}>
                ⚠️ {message}
            </div>
        </div>
    );
}