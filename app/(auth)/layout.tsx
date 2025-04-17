import Link from "next/link";
import styles from "./layout.module.scss";
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.wrapper}>
            <Link className={styles.logo} href="/">
                <img src="/images/LogoChangeMe.png" />
                <h1>Change Me</h1>
            </Link>
            <main>{children}</main>
        </div>
    );
}
