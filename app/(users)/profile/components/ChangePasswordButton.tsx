"use client";

import { useRouter } from "next/navigation";

export default function ChangePasswordButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("profile/password-change");
    };

    return (
        <button onClick={handleClick}>
            비밀번호 수정하기
        </button>
    );
}