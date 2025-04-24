"use client";
// import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./UpdateMessageForm.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { ChangeEvent, useState } from "react";
import { MessageDto } from "@/application/usecase/message/dto/MessageDto";

type UpdateMessageFormProps = {
    messageDto: MessageDto;
    handleSubmit: (id: number, content: string) => Promise<void>;
};

export default function MessageForm(props: UpdateMessageFormProps) {
    const contentMaxLength: number = 100;
    const defaultProfileImageUrl: string = "/images/ProfileCircle.png";
    const defaultContent: string = props.messageDto.content;

    const { token } = useAuthStore();
    const [nickname, setNickname] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>(defaultProfileImageUrl);

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

    const [content, setContent] = useState<string>(defaultContent);
    const [wordCount, setWordCount] = useState<number>(defaultContent.length);

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
                    src={imageUrl || defaultProfileImageUrl}
                    alt="프로필 이미지"
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full"
                />
                <div className="text-sm font-semibold">{nickname}</div>
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
            <button
                onClick={() => props.handleSubmit(props.messageDto.id, content)}
            >
                수정
            </button>
        </div>
    );
}
