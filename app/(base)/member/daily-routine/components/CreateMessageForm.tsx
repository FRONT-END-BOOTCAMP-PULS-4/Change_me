"use client";

import Image from "next/image";
import styles from "./CreateMessageForm.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { ChangeEvent, useEffect, useState } from "react";

type CreateMessageFormProps = {
    handleSubmit: (content: string) => Promise<void>;
};

export default function CreateMessageForm(props: CreateMessageFormProps) {
    const contentMaxLength: number = 100;
    const defaultProfileImageUrl: string = "/images/ProfileCircle.png";

    const { token } = useAuthStore();
    const [nickname, setNickname] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        const getMemberInfo = async () => {
            const res = await fetch("/api/members/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const member = await res.json();

            if (res.ok) {
                setNickname(member.nickname);
                setImageUrl(member.imageUrl);
            }
        };

        getMemberInfo();
    }, [token]);

    const [content, setContent] = useState<string>("");
    const [wordCount, setWordCount] = useState<number>(0);

    const handleChange = async (element: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = element.target;

        // auto-adjust the height of the textarea
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;

        let newContent = textarea.value;
        if (newContent.length > contentMaxLength) {
            newContent = newContent.slice(0, contentMaxLength);
        }

        setContent(newContent);
        setWordCount(newContent.length);
    };

    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <Image
                    src={imageUrl || defaultProfileImageUrl}
                    alt="프로필 이미지"
                    width={50}
                    height={50}
                    className={styles.profileImage}
                />
                <div className={styles.nickname}>{nickname}</div>
            </nav>
            <textarea
                className={styles.textarea}
                id="message"
                name="message"
                value={content}
                maxLength={contentMaxLength}
                onChange={(e) => handleChange(e)}
                placeholder="메시지를 입력하세요."
            />
            <div className={styles.divider} />
            <nav className={styles.navBottom}>
                <div>
                    {wordCount}/{contentMaxLength}
                </div>
                <button
                    className={styles.button}
                    onClick={() => props.handleSubmit(content)}
                >
                    등록
                </button>
            </nav>
        </div>
    );
}
