"use client";

import { useRouter } from "next/navigation";

export default function WithdrawButton() {
    const router = useRouter();

    const handleWithdraw = async () => {
        const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
        if (!confirmed) return;

        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch("/api/members/withdraw", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            localStorage.removeItem("access_token");
            alert("탈퇴가 완료되었습니다.");
            router.push("/login");
        } else {
            const data = await res.json();
            alert(data.error || "탈퇴 실패");
        }
    };

    return (
        <button onClick={handleWithdraw} style={{ marginTop: "1rem", color: "gray" }}>
            탈퇴하기
        </button>
    );
}