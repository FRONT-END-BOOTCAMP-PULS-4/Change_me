"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function DeleteMessageButton() {
    const handleDeleteMessage = () => {};

    return (
        <button
            onClick={handleDeleteMessage}
            style={{ marginTop: "2rem", color: "red" }}
        >
            삭제
        </button>
    );
}
