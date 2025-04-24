"use client";

import { AnonHabit } from "@/hooks/useAnonHabits";
import styles from "./HabitCard.module.scss";

type HabitCardProps = {
    habit: AnonHabit;
};

export default function HabitCard({
    habit: { id, userNickname, imageUrl, isActive, habitName, description },
}: HabitCardProps) {
    const baseImageUrl = "/images/Facade.png";

    return (
        <div className={styles.card}>
            <div className={styles.profile}>
                <div className={styles.img}>
                    <img
                        src={isActive && imageUrl ? imageUrl : baseImageUrl}
                        alt="profile"
                    />
                </div>
                <p className={styles.text}>
                    {isActive ? userNickname : "탈퇴한 회원"}
                </p>
            </div>
            <p className={styles.text}>{habitName}</p>
            <p className={styles.text}>{description}</p>
        </div>
    );
}
