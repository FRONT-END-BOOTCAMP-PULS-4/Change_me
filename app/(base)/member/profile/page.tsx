"use client";
import { useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm";
import WithdrawButton from "./components/WithdrawButton";
import ChangePasswordButton from "./components/ChangePasswordButton";
import styles from "./page.module.scss";
import { useAuthStore } from "@/stores/authStore";
import Loading from "@/app/components/Loading";

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = useAuthStore.getState().token;
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

    if (!profile) return <Loading />;

    return (
        <div className={styles.pageWrapper}>
            <ProfileForm profile={profile} />

            <div className={styles.actionButtons}>
                <ChangePasswordButton />
                <WithdrawButton />
            </div>
        </div>
    );
}
