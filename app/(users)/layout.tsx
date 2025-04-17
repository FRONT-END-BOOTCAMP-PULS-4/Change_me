"use client";

import React from "react";
import UserHeader from "./components/UserHeader";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <UserHeader />
            <main>{children}</main>
        </>
    );
}
