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
                priority // Next.js가 이 이미지를 가장 먼저 preload하게 해줘서 렌더링 속도를 개선
            />
            <div className={styles.text}>Loading...</div>
        </div>
    );
}