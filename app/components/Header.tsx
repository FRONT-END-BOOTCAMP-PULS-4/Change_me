"use client";

import { useMemberStore } from "@/stores/MemberStore";
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
    const isLoggedIn = useMemberStore((state) => state.isLoggedIn);
    const logout = useMemberStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
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
