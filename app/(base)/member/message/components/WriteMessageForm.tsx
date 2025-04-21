"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./WriteMessageForm.module.scss";
import { useAuthStore } from "@/stores/authStore";

export default function WriteMessageForm() {
    const [content, setContent] = useState("");

    const handleChange = async () => {};

    const handleSubmit = async () => {
        const token = useAuthStore.getState().token;

        const res = await fetch("/api/members/messages", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content: content }),
        });

        const data = await res.json();
        setContent(content);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    id="message"
                    name="message"
                    value={content}
                    onChange={handleChange}
                    placeholder="메시지를 입력하세요."
                />
                {/* {errors.email && (
                    <div className={styles.error}>{errors.email}</div>
                )} */}
            </div>
        </form>
    );
}
