"use client";

import useModalStore from "@/stores/modalStore";
import ViewHabitModal from "../(base)/member/components/modals/ViewHabitModal";
import CategoryModal from "../admin/components/CategoryModal";
import TestCreateHabitModal from "../(base)/member/components/modals/TestCreateHabitModal";

export default function Modals() {
    const { modalType, isOpen, modalProps } = useModalStore();

    if (!isOpen) return null;

    switch (modalType) {
        case "category":
            return <CategoryModal {...modalProps} />;

        case "habit":
            return <TestCreateHabitModal {...modalProps} />;

        case "viewHabit":
            return <ViewHabitModal {...modalProps} />;

        default:
            return null;
    }
}
