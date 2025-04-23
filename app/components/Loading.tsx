"use client";

import Image from "next/image";
import styles from "./Loading.module.scss";

export default function Loading() {
    return (
        <div className={styles.container}>
            <Image
                src="/images/Loading.png"
                alt="로딩 중 이미지"
                width={140}
                height={140}
                className={styles.image}
            />
            <div className={styles.text}>Loading...</div>
        </div>
    );
}