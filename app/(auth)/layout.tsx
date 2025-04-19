"use client";

import Link from "next/link";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated()) {
            router.push("/");
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) return <Loading />;

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
