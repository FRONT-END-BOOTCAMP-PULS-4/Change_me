import { create } from "zustand";

type ModalType = "category" | "createHabit" | "editHabit" | "viewHabit" | null;

interface ModalStore {
    modalType: ModalType;
    isOpen: boolean;
    modalProps: any;
    openModal: (type: ModalType, props?: any) => void;
    closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
    modalType: null,
    isOpen: false,
    modalProps: null,
    openModal: (type, props = null) =>
        set({ modalType: type, modalProps: props, isOpen: true }),
    closeModal: () => set({ modalType: null, modalProps: null, isOpen: false }),
}));

export default useModalStore;
