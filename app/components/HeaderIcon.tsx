"use client";
import Link from "next/link";
import styles from "./HeaderIcon.module.scss";

type props = {
    to: string;
    imgPath: string;
    title: string;
    isSelected: boolean;
    handleClick: () => void;
};

export default function HeaderIcon({
    imgPath,
    to,
    title,
    isSelected,
    handleClick,
}: props) {
    return (
        <Link href={to} className={styles.link} onClick={handleClick}>
            <img src={imgPath} alt={title} />
            <h3 className={`${isSelected && styles.active}`}>{title}</h3>
        </Link>
    );
}
