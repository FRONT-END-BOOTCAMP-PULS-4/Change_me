"use client";
// import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./MessageForm.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { ChangeEvent, useState } from "react";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";

type MessageFormProps = {
    messageDto: MessageDto | null;
    handleSubmit: (content: string) => Promise<void>;
};

export default function MessageForm(props: MessageFormProps) {
    const submitButtonName: string =
        props.messageDto === null ? "등록" : "수정";
    const defaultContent: string =
        props.messageDto === null ? "" : props.messageDto.content;

    const { user } = useAuthStore();
    const [content, setContent] = useState<string>(defaultContent);
    const [wordCount, setWordCount] = useState<number>(0);

    const contentMaxLength: number = 100;
    const defaultProfileImageUrl: string = "/images/ProfileCircle.png";

    const handleChange = async (element: ChangeEvent<HTMLInputElement>) => {
        if (element.target.value.length > contentMaxLength) {
            element.target.value = element.target.value.slice(
                0,
                contentMaxLength,
            );
        }

        const newContent = element.target.value;
        const newWordCount = newContent.length;
        setContent(newContent);
        setWordCount(newWordCount);
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
                maxLength={contentMaxLength}
                onChange={(e) => handleChange(e)}
                placeholder="메시지를 입력하세요."
            />
            <div>
                {wordCount}/{contentMaxLength}
            </div>
            <button onClick={() => props.handleSubmit(content)}>
                {submitButtonName}
            </button>
        </div>
    );
}
