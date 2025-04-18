"use client";

import { useRouter } from "next/navigation";
import { useMemberStore } from "@/stores/memberStore";

export default function LogoutButton() {
    const logout = useMemberStore((state) => state.logout);
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
