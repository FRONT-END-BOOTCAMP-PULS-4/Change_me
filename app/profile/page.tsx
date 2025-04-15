"use client";
import { useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm";
import LogoutButton from "./components/LogoutButton";

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                window.location.href = "/login";
                return;
            }

            const res = await fetch("/api/members/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setProfile(data);
            } else {
                // 토큰이 잘못됐거나 만료된 경우
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <p>로딩 중...</p>;

    return (
        <>
            <ProfileForm profile={profile} />
            <LogoutButton />
        </>
    );
}
