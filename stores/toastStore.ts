import { create } from "zustand";

interface ToastStore {
    message: string;
    show: (msg: string) => void;
    hide: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    message: "",
    show: (msg: string) => {
        set({ message: msg });
        setTimeout(() => set({ message: "" }), 3000);
    },
    hide: () => set({ message: "" }),
}));