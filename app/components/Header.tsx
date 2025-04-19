"use client";

import { useAuthStore } from "@/stores/authStore";
import HeaderIcon from "./HeaderIcon";
import Link from "next/link";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";

type HeaderProps = {
    iconLinks?: {
        to: string;
        imgPath: string;
        title: string;
    }[];
};

export default function Header({ iconLinks }: HeaderProps) {
    const isLoggedIn = !!useAuthStore((state) => state.token);
    const { logout, isAdmin } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const handleLogoClick = () => {
        if (!isAdmin()) return;
        router.push("/");
    };

    return (
        <header className={styles.header}>
            <div
                className={`${styles.logo} ${isAdmin() ? styles.admin : ""}`}
                onClick={handleLogoClick}
            >
                <img src={"/images/LogoChangeMe.png"} alt="Change Me" />
                <h1>Change Me</h1>
            </div>
            <nav className={styles.nav}>
                {iconLinks?.map((link, idx) => (
                    <HeaderIcon
                        key={idx}
                        to={link.to}
                        imgPath={link.imgPath}
                        title={link.title}
                    />
                ))}
            </nav>
            <div className={styles.user}>
                {isLoggedIn ? (
                    <>
                        {" "}
                        {isAdmin() && <Link href="/admin"> 카테고리 관리</Link>}
                        <Link href="/member/profile">마이페이지</Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <Link href="/login">로그인</Link>
                )}
            </div>
        </header>
    );
}
