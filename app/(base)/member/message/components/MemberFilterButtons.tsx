"use client";

import { useState } from "react";
import styles from "./MemberFilterButtons.module.scss";

type MemberFilterButtonsProps = {
    mine: boolean;
    onMineChange: (newMine: boolean) => void;
};

export default function MemberFilterButtons(props: MemberFilterButtonsProps) {
    // TODO: styling two buttons based on 'mine' option
    return (
        <nav className={styles.nav}>
            <button
                className={styles[String(props.mine)]}
                onClick={() => props.onMineChange(false)}
            >
                전체
            </button>
            <button
                className={styles[String(props.mine)]}
                onClick={() => props.onMineChange(true)}
            >
                내 메시지
            </button>
        </nav>
    );
}
