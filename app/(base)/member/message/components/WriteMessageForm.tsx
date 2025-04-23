"use client";
// import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./WriteMessageForm.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { ChangeEvent, useState } from "react";

type WriteMessageFormProps = {
    handleSubmit: (content: string) => Promise<void>;
};

export default function WriteMessageForm(props: WriteMessageFormProps) {
    const { user } = useAuthStore();
    const [content, setContent] = useState<string>("");
    const [wordCount, setWordCount] = useState<number>(0);
    const defaultProfileImageUrl: string = "/images/ProfileCircle.png";
    const handleChange = async (element: ChangeEvent<HTMLInputElement>) => {
        const newContent = element.target.value;
        const newWordCount = newContent.length;
        setContent(newContent);
        setWordCount(newWordCount);

        if (newWordCount > 100) {
            // TODO: word count limit
        }
    };

    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <Image
                    src={user?.imageUrl || defaultProfileImageUrl}
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
                onChange={(e) => handleChange(e)}
                placeholder="메시지를 입력하세요."
            />
            <div>{wordCount}/100</div>
            <button onClick={() => props.handleSubmit(content)}>등록</button>
        </div>
    );
}
