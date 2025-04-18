"use client";

import { useEffect } from "react";
import { useMemberStore } from "@/stores/memberStore";

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const tryAutoLogin = useMemberStore((state) => state.tryAutoLogin);

    useEffect(() => {
        tryAutoLogin();
    }, []);

    return <>{children}</>;
}
