"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
            alert("모든 비밀번호를 입력해주세요.");
            return;
        }

        if (passwordError) {
            alert(passwordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("로그인이 필요합니다.");
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
            alert("비밀번호가 틀렸습니다. 다시 입력해주세요.");
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
            alert("비밀번호가 성공적으로 변경되었습니다.");
            router.push("/profile");
        } else {
            const data = await changeRes.json();
            alert(data.error || "비밀번호 변경에 실패했습니다.");
        }
    };

    return (
        <div>
            <h2>비밀번호 변경</h2>
            <p>안전한 비밀번호로 내 정보를 보호하세요</p>

            <div>
                <label>현재 비밀번호</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="비밀번호"
                />
            </div>

            <div>
                <label>새 비밀번호</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder="새 비밀번호"
                />
                {passwordError && (
                    <div style={{ color: "red", fontSize: "12px" }}>{passwordError}</div>
                )}
            </div>

            <div>
                <label>새 비밀번호 확인</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호 확인"
                />
            </div>

            <button onClick={handleSubmit}>변경</button>
        </div>
    );
}