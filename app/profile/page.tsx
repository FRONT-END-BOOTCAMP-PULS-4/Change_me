"use client";
import { useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm";

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await fetch("/api/members/profile", {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
            } else {
                // 인증 안 됐을 때 로그인으로 이동
                window.location.href = "/login";
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <p>로딩 중...</p>;

    return <ProfileForm profile={profile} />;
}