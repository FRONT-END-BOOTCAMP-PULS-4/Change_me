"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const isAdmin = useAuthStore((state) => state.isAdmin);
    const [isLoading, setIsLoading] = useState(true);
    const { show } = useToastStore();

    useEffect(() => {
        if (!isAuthenticated()) {
            localStorage.setItem("returnURL", pathname); // Use window.location.pathname for the current URL path
            router.push("/login"); // Redirect to login page
            show("로그인이 필요한 서비스입니다.");
        } else if (!isAdmin()) {
            router.push("/error/403");
            show("관리자 서비스입니다.");
        } else {
            setIsLoading(false); // Loading complete after login check
        }
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
