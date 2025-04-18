"use client";

import { useRouter } from "next/navigation";
import styles from "./ChangePasswordButton.module.scss";

export default function ChangePasswordButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("profile/password-change");
    };

    return (
        <button onClick={handleClick} className={styles.changePasswordButton}>
            비밀번호 변경하기
        </button>
    );
}