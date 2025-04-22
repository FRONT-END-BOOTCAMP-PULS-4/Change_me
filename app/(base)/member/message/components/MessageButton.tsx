"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

type MessageButtonProps = {
    type: string;
};

export default function MessageButton(props: MessageButtonProps) {
    const handleOnClick = () => {
        if (props.type === "Edit") {
            // TODO: update messagelike, change UI locally
        } else if (props.type === "Delete") {
            // TODO: delete messagelike, change UI locally
        }
    };

    return (
        <button
            onClick={handleOnClick}
            style={{ marginTop: "2rem", color: "red" }}
        >
            {props.type === "Edit" ? "수정" : "삭제"}
        </button>
    );
}
