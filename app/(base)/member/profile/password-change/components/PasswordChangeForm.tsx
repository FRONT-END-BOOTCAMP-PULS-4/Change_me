"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import styles from "./PasswordChangeForm.module.scss";
import { useToastStore } from "@/stores/toastStore";

export default function PasswordChangeForm() {
    const router = useRouter();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewPassword(value);

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError("비밀번호는 8~16자이며, 영문/숫자/특수문자를 포함해야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            useToastStore.getState().show("모든 비밀번호를 입력해주세요.");
            return;
        }

        if (passwordError) {
            useToastStore.getState().show(passwordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            useToastStore.getState().show("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        const token = useAuthStore.getState().token;
        if (!token) {
            useToastStore.getState().show("로그인이 필요합니다.");
            return;
        }

        // 현재 비밀번호 검증
        const verifyRes = await fetch("/api/members/verify-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ password: currentPassword }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyRes.ok || !verifyData.valid) {
            useToastStore.getState().show("비밀번호가 틀렸습니다. 다시 입력해주세요.");
            return;
        }

        // 비밀번호 변경 요청
        const changeRes = await fetch("/api/members/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ newPassword }),
        });

        if (changeRes.ok) {
            useToastStore.getState().show("비밀번호가 성공적으로 변경되었습니다.");
            router.push("/member/profile");
        } else {
            const data = await changeRes.json();
            useToastStore.getState().show(
                data.error || "비밀번호 변경에 실패했습니다."
            );
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <div className={styles.header}>
                    <div className={styles.texts}>
                        <h2>비밀번호 변경</h2>
                        <p>
                            안전한 비밀번호로 내 정보를 보호하세요<br />
                            <a>다른 아이디/사이트에서 사용한 적 없는 비밀번호</a><br />
                            <a>이전에 사용한 적 없는 비밀번호</a>가 안전합니다.
                        </p>
                    </div>
                    <div className={styles.image}>
                        <img src="/images/Security.png" alt="보안 이미지" />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputRow}>
                        <label>현재 비밀번호</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputRow}>
                        <label>새 비밀번호</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder="새 비밀번호"
                        />
                    </div>
                    {passwordError && (
                        <div className={styles.error}>{passwordError}</div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputRow}>
                        <label>새 비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="새 비밀번호 확인"
                        />
                    </div>
                </div>

                <button onClick={handleSubmit} className={styles.submitButton}>
                    변경
                </button>
            </div>
        </div>
    );
}