"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./WriteMessageForm.module.scss";
import { useAuthStore } from "@/stores/authStore";

type Props = {
    profile: {
        id: string;
        name: string;
        email: string;
        nickname: string;
        createdAt: string;
        imageUrl?: string | null;
    };
};

export default function WriteMessageForm({ profile }: Props) {
    const createdAt = new Date(profile.createdAt);
    // KST로 보정
    const kst = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
    // YYYY.MM.DD 포맷
    const formattedDate = `${kst.getFullYear()}.${String(kst.getMonth() + 1).padStart(2, "0")}.${String(kst.getDate()).padStart(2, "0")}`;

    const [nickname, setNickname] = useState(profile.nickname);

    const handleSubmit = async () => {
        const token = useAuthStore.getState().token;

        const formData = new FormData();
        formData.append("id", profile.id);
        formData.append("nickname", nickname);

        const res = await fetch("/api/members/messages", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await res.json();
    };

    return <div></div>;
}
