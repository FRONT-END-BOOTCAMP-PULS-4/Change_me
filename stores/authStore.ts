import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    id: string;
    name: string;
    email: string;
    nickname: string;
    role: number;
    imageUrl: string;
};

interface AuthState {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    login: (user: User) => void;
    logout: () => void;
    isAdmin: () => boolean;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            setToken: (token: string) => set({ token }),
            login: (user: User) => set({ user }),
            logout: () => set({ user: null, token: null }),
            isAdmin: () => get().user?.role === 1,
            isAuthenticated: () => !!get().token,
        }),
        { name: "auth-storage" }, //LocalStorage 키 이름
    ),
);

// export function getToken() {
//     return localStorage.getItem("access_token");
// }

// type MemberState = {
//   user: User | null;
//   isLoggedIn: boolean;
//   setUser: (user: User, token: string) => void;
//   logout: () => void;
//   //tryAutoLogin: () => Promise<void>;
// };

// export const useAuthStore = create<MemberState>((set) => ({
//     user: null,
//     isLoggedIn: false,

//     setUser: (user, token) => {
//         localStorage.setItem("access_token", token);
//         set({ user, isLoggedIn: true });
//     },

//     logout: () => {
//         localStorage.removeItem("access_token");
//         set({ user: null, isLoggedIn: false });
//     },

//     tryAutoLogin: async () => {
//         const token = localStorage.getItem("access_token");
//         if (!token) return;

//         const res = await fetch("/api/members/profile", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         if (res.ok) {
//             const user = await res.json();
//             set({ user, isLoggedIn: true });
//         } else {
//             localStorage.removeItem("access_token");
//         }
//     },
// }));
