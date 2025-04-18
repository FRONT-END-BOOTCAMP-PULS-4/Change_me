"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

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

    useEffect(() => {
        if (!isAuthenticated()) {
            localStorage.setItem("returnURL", pathname); // Use window.location.pathname for the current URL path
            router.push("/login"); // Redirect to login page
        } else if (!isAdmin()) {
            router.push("/error/403");
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
