import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayoutWrapper from "./common-components/ClientLayoutWrapper";

const NotoSans = localFont({
    src: [
        {
            path: "../public/fonts/NotoSansKR-Bold.woff",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/NotoSansKR-SemiBold.woff",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/NotoSansKR-Regular.woff",
            weight: "400",
            style: "normal",
        },
    ],
});

export const metadata: Metadata = {
    icons: "/images/LogoChangeMe.png",
    title: "Change Me",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={NotoSans.className}>
            <body>
                <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            </body>
        </html>
    );
}
