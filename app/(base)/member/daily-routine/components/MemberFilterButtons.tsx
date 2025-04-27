"use client";

import styles from "./MemberFilterButtons.module.scss";

type MemberFilterButtonsProps = {
    mine: boolean;
    onMineChange: (newMine: boolean) => void;
};

export default function MemberFilterButtons(props: MemberFilterButtonsProps) {
    return (
        <nav className={styles.nav}>
            <button
                className={`${styles.button} ${!props.mine ? styles.active : ""}`}
                onClick={() => props.onMineChange(false)}
            >
                전체
            </button>
            <button
                className={`${styles.button} ${props.mine ? styles.active : ""}`}
                onClick={() => props.onMineChange(true)}
            >
                내 메시지
            </button>
        </nav>
    );
}
