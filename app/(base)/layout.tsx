"use client";

import React from "react";
import BaseHeader from "./components/BaseHeader";

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BaseHeader />
            <main>{children}</main>
        </>
    );
}
