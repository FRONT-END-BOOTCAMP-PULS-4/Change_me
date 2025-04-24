"use client";

import { AnonHabit } from "@/hooks/useAnonHabits";
import styles from "./HabitCard.module.scss";

type HabitCardProps = {
    habit: AnonHabit;
};

const { ["card-front"]: cardFront, ["card-back"]: cardBack } = styles;

export default function HabitCard({
    habit: { id, userNickname, imageUrl, isActive, habitName, description },
}: HabitCardProps) {
    const baseImageUrl = "/images/Facade.png";

    return (
        <div className={styles.card}>
            <div className={cardFront}>
                <div className={styles.profile}>
                    <img
                        className={styles.profile}
                        src={isActive && imageUrl ? imageUrl : baseImageUrl}
                        alt="profile"
                    />
                </div>
                <p className={styles.nickname}>
                    {isActive ? userNickname : "탈퇴한 회원"}
                </p>
                <p className={styles.title}>{habitName}</p>
            </div>
            <div className={cardBack}>
                <p>{description}</p>
            </div>
        </div>
    );
}
