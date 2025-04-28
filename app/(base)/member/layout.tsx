"use client";

import Loading from "@/app/components/Loading";
import { useAuthStore } from "@/stores/authStore";
import { useToastStore } from "@/stores/toastStore";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function MemberLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    const { show } = useToastStore();

    useEffect(() => {
        if (!isAuthenticated()) {
            localStorage.setItem("returnURL", pathname); // Use window.location.pathname for the current URL path
            router.push("/login"); // Redirect to login page
            show("로그인이 필요한 서비스입니다.");
        } else {
            setIsLoading(false); // Loading complete after login check
        }
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return <>{children}</>;
}
