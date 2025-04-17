"use client";
import { useRef, useState } from "react";
import Image from "next/image";

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
            alert("비밀번호를 입력해주세요.");
            return;
        }

        if (!nickname.trim()) {
            alert("닉네임을 입력해주세요.");
            return;
        }

        // 비밀번호 검증
        const passwordRes = await fetch("/api/members/verify-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: profile.id, password }),
        });

        const passwordData = await passwordRes.json();

        if (!passwordRes.ok || !passwordData.valid) {
            alert("비밀번호가 틀렸습니다. 다시 입력해주세요.");
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
            body: formData,
        });

        const data = await res.json();
        if (res.ok) {
            if (data.imageUrl) {
                setPreview(data.imageUrl);
            }
            alert("프로필이 성공적으로 변경되었습니다.");
            setPassword("");
        } else {
            alert(data.error || "프로필 업데이트 실패");
        }
    };

    return (
        <div>
            <h2>프로필</h2>

            <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
                <div
                    onClick={handleImageClick}
                    style={{
                        borderRadius: "50%",
                        overflow: "hidden",
                        width: 140,
                        height: 140,
                        border: "3px solid white",
                        cursor: "pointer",
                        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                    }}
                >
                    <Image
                        src={preview || "/images/ProfileSquare.png"}
                        alt="프로필 이미지"
                        width={140}
                        height={140}
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
            </div>

            <p>{formattedDate} 가입</p>
            <div>
                <strong>이름</strong> <div>{profile.name}</div>
                <strong>이메일</strong> <div>{profile.email}</div>
                <strong>비밀번호 확인</strong><br />
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 입력"
                    />
                </div>
                <strong>닉네임</strong>
                <div>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임"
                    />
                </div>
            </div>
            <button onClick={handleSubmit}>수정</button>
        </div>
    );
}