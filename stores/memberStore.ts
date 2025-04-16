import { create } from "zustand";

type User = {
    id: string;
    name: string;
    email: string;
    nickname: string;
};

type MemberState = {
    user: User | null;
    isLoggedIn: boolean;
    setUser: (user: User, token: string) => void;
    logout: () => void;
    tryAutoLogin: () => Promise<void>;
};

export const useMemberStore = create<MemberState>((set) => ({
    user: null,
    isLoggedIn: false,

    setUser: (user, token) => {
        localStorage.setItem("access_token", token);
        set({ user, isLoggedIn: true });
    },

    logout: () => {
        localStorage.removeItem("access_token");
        set({ user: null, isLoggedIn: false });
    },

    tryAutoLogin: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await fetch("/api/members/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const user = await res.json();
            set({ user, isLoggedIn: true });
        } else {
            localStorage.removeItem("access_token");
        }
    },
}));