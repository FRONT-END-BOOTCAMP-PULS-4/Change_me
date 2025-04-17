"use client";

import { useMemberStore } from "@/stores/memberStore";
import HeaderIcon from "./HeaderIcon";
import Link from "next/link";
import styles from "./RootHeader.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

const iconLinkList = [
    {
        id: 0,
        to: "/",
        imgPath: "/images/LogoOurHabits.png",
        title: "모두의 습관",
    },
    {
        id: 1,
        to: "/daily-routine",
        imgPath: "/images/LogoDailyRoutine.png",
        title: "오늘의 루틴",
    },
    {
        id: 2,
        to: "/record",
        imgPath: "/images/LogoRecord.png",
        title: "기록 보기",
    },
];

export default function RootHeader() {
    const [selected, setSelected] = useState<number>(0);
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
                {iconLinkList.map((link) => (
                    <HeaderIcon
                        key={link.id}
                        to={link.to}
                        imgPath={link.imgPath}
                        title={link.title}
                        handleClick={() => setSelected(link.id)}
                        isSelected={selected === link.id}
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
