import Link from "next/link";
import Image from "next/image";
import styles from "./NotFound.module.scss";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <Image
                src="/images/NotFound.png"
                alt="NotFound"
                width={140}
                height={140}
                className={styles.image}
            />
            <h1 className={styles.title}>404 - Not Found</h1>
            <p className={styles.message}>페이지가 존재하지 않습니다.</p>
            <Link href="/" className={styles.link}>
                홈으로 돌아가기
            </Link>
        </div>
    );
}