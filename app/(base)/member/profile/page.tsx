"use client";
import { useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm";
import WithdrawButton from "./components/WithdrawButton";
import ChangePasswordButton from "./components/ChangePasswordButton";
import styles from "./page.module.scss";
import { useAuthStore } from "@/stores/authStore";
import Loading from "@/app/components/Loading";
import { useToastStore } from "@/stores/toastStore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const { logout } = useAuthStore();
    const { show } = useToastStore();
    const router = useRouter();

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
            } else if (res.status === 401) {
                logout();
                show("로그인이 필요한 서비스입니다.");
                router.push("/login");
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
