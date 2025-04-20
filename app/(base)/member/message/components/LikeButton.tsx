"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function LikeButton() {
    const toggleLike = () => {};

    return (
        <button
            onClick={toggleLike}
            style={{ marginTop: "2rem", color: "red" }}
        ></button>
    );
}
