"use client";

import { useRouter } from "next/navigation";
import styles from "./WithdrawButton.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";

export default function WithdrawButton() {
    const router = useRouter();
    const { logout } = useAuthStore.getState();

    const handleWithdraw = async () => {
        const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
        if (!confirmed) return;

        const token = useAuthStore.getState().token;
        if (!token) return;

        const res = await fetch("/api/members/withdraw", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            logout();
            useToastStore.getState().show("탈퇴가 완료되었습니다.");
            router.push("/login");
        } else {
            const data = await res.json();
            useToastStore.getState().show(
                data.error || "탈퇴 실패"
            );
        }
    };

    return (
        <button onClick={handleWithdraw} className={styles.withdrawButton}>
            탈퇴하기
        </button>
    );
}