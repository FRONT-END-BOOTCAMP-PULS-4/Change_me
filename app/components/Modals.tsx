"use client";

import useModalStore from "@/stores/modalStore";
import ViewHabitModal from "../(base)/member/components/modals/ViewHabitModal";
import CategoryModal from "../admin/components/CategoryModal";
import HabitModal from "../(base)/member/components/modals/HabitModal";

export default function Modals() {
    const { modalType, isOpen, modalProps } = useModalStore();

    if (!isOpen) return null;

    switch (modalType) {
        case "category":
            return <CategoryModal {...modalProps} />;

        case "habit":
            return <HabitModal {...modalProps} />;

        case "viewHabit":
            return <ViewHabitModal {...modalProps} />;

        default:
            return null;
    }
}
