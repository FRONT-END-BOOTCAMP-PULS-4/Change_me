"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export default function MessageButton() {
    const updateIsSelected = true; // TODO: manage state of "selected menu" (update, delete)
    const handleOnClick = () => {
        if (updateIsSelected) {
            // TODO: update messagelike, change UI locally
        } else {
            // TODO: delete messagelike, change UI locally
        }
    };

    return (
        <button
            onClick={handleOnClick}
            style={{ marginTop: "2rem", color: "red" }}
        >
            {updateIsSelected ? "수정" : "삭제"}
        </button>
    );
}
