"use client";
import Link from "next/link";
import styles from "./HeaderIcon.module.scss";
import { usePathname } from "next/navigation";

type props = {
    to: string;
    imgPath: string;
    title: string;
};

export default function HeaderIcon({ imgPath, to, title }: props) {
    const pathname = usePathname();
    const isSelected = pathname === to;
    return (
        <Link href={to} className={styles.link}>
            <img src={imgPath} alt={title} />
            <h3 className={`${isSelected && styles.active}`}>{title}</h3>
        </Link>
    );
}
