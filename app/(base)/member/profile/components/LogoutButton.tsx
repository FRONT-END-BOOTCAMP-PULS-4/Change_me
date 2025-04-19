"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function LogoutButton() {
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout(); // Zustand 상태 + localStorage 초기화
        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            style={{ marginTop: "2rem", color: "red" }}
        >
            로그아웃
        </button>
    );
}
