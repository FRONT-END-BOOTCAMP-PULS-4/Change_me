"use client";
// import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./WriteMessageForm.module.scss";
import { useAuthStore } from "@/stores/authStore";

type WriteMessageFormProps = {
    handleSubmit: (content: string) => Promise<void>;
};

export default function WriteMessageForm(props: WriteMessageFormProps) {
    const { user } = useAuthStore();

    let content: string = "";
    let wordCount: number;
    const handleChange = async () => {}; // TODO: word count limit

    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <Image
                    src={user?.imageUrl || "/images/ProfileCircle.png"}
                    alt="프로필 이미지"
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full"
                />
                <div className="text-sm font-semibold">{user?.nickname}</div>
            </nav>
            <input
                type="text"
                id="message"
                name="message"
                value={content}
                onChange={handleChange}
                placeholder="메시지를 입력하세요."
            />

            <button onClick={() => props.handleSubmit(content)}>등록</button>
        </div>
    );
}
