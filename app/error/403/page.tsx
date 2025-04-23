import Link from "next/link";
import Image from "next/image";
import styles from "./Page403.module.scss";

export default function Page403() {
    return (
        <div className={styles.container}>
            <Image
                src="/images/NotFound.png"
                alt="NotFound"
                width={140}
                height={140}
                className={styles.image}
            />
            <h1 className={styles.title}>403 - Forbidden</h1>
            <p className={styles.message}>죄송합니다. 이 페이지에 접근할 권한이 없습니다.</p>
            <Link href="/" className={styles.link}>
                홈으로 돌아가기
            </Link>
        </div>
    );
}