"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProfileForm.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";

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

export default function ProfileForm({ profile }: Props) {
    const createdAt = new Date(profile.createdAt);
    // KST로 보정
    const kst = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
    // YYYY.MM.DD 포맷
    const formattedDate = `${kst.getFullYear()}.${String(kst.getMonth() + 1).padStart(2, "0")}.${String(kst.getDate()).padStart(2, "0")}`;

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(profile.imageUrl ?? null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState(profile.nickname);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setSelectedFile(file); // 수정 버튼에서 사용될 파일 저장
    };

    const handleSubmit = async () => {
        if (!password) {
            useToastStore.getState().show("비밀번호를 입력해주세요.");
            return;
        }

        if (!nickname.trim()) {
            useToastStore.getState().show("닉네임을 입력해주세요.");
            return;
        }

        const token = useAuthStore.getState().token;
        // 비밀번호 검증
        const passwordRes = await fetch("/api/members/verify-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ id: profile.id, password }),
        });

        const passwordData = await passwordRes.json();

        if (!passwordRes.ok || !passwordData.valid) {
            useToastStore.getState().show("비밀번호가 틀렸습니다. 다시 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append("id", profile.id);
        formData.append("nickname", nickname);
        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        const res = await fetch("/api/members/profile-image", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            if (data.imageUrl) {
                setPreview(data.imageUrl);
            }
            useToastStore.getState().show("프로필이 성공적으로 변경되었습니다.");
            setPassword("");
        } else {
            useToastStore.getState().show(
                data.error || "프로필 업데이트 실패"
            );
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>프로필</h2>

            <div onClick={handleImageClick} className={styles.avatar}>
                <Image
                    src={preview || "/images/ProfileSquare.png"}
                    alt="프로필 이미지"
                    width={140}
                    height={140}
                    style={{ objectFit: "cover" }}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
            </div>
            <p className={styles.joinedDate}>{formattedDate} 가입</p>

            <div className={styles.infoGroup}>
                <div className={styles.row}>
                    <strong>이름</strong>
                    <div>{profile.name}</div>
                </div>

                <div className={styles.row}>
                    <strong>이메일</strong>
                    <div>{profile.email}</div>
                </div>

                <div className={styles.row}>
                    <strong>비밀번호</strong>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력"
                    />
                </div>
                {password === "" && <div className={styles.error}>비밀번호를 입력해주세요.</div>}

                <div className={styles.row}>
                    <strong>닉네임</strong>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임"
                    />
                </div>
                {nickname.length > 20 && (
                    <div className={styles.error}>20자 이내로 작성해주세요.</div>
                )}

                <button className={styles.submitButton} onClick={handleSubmit}>
                    수정
                </button>
            </div>
        </div>
    );
}