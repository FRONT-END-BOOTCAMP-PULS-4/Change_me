"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function EditMessageButton() {
    const handleEditMessage = () => {};

    return (
        <button
            onClick={handleEditMessage}
            style={{ marginTop: "2rem", color: "red" }}
        >
            수정
        </button>
    );
}
