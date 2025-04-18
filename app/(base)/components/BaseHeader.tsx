"use client";

import { useMemberStore } from "@/stores/memberStore";
import HeaderIcon from "./HeaderIcon";
import Link from "next/link";
import styles from "./BaseHeader.module.scss";
import { useRouter } from "next/navigation";

const iconLinkList = [
    {
        to: "/",
        imgPath: "/images/LogoOurHabits.png",
        title: "모두의 습관",
    },
    {
        to: "/member/daily-routine",
        imgPath: "/images/LogoDailyRoutine.png",
        title: "오늘의 루틴",
    },
    {
        to: "/member/record",
        imgPath: "/images/LogoRecord.png",
        title: "기록 보기",
    },
];

export default function BaseHeader() {
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
                {iconLinkList.map((link, idx) => (
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
                        <Link href="/profile">마이페이지</Link>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <Link href="/login">로그인</Link>
                )}
            </div>
        </header>
    );
}
