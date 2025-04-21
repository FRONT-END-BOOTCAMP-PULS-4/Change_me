"use client";

import useModalStore from "@/stores/modalStore";
import CreateHabitModal from "../(base)/member/components/modals/CreateHabitModal";
import EditHabitModal from "../(base)/member/components/modals/EditHabitModal";
import ViewHabitModal from "../(base)/member/components/modals/ViewHabitModal";
import CategoryModal from "../admin/components/CategoryModal";

export default function Modals() {
    const { modalType, isOpen, modalProps } = useModalStore();

    if (!isOpen) return null;

    switch (modalType) {
        case "category":
            return <CategoryModal {...modalProps} />;

        // createHabit, editHabit => habit으로 통일 가능(ex. HabitModal.tsx)
        // HabitModal의 props로 type 구분해서 동작 다르게 구현해도 됨.
        case "createHabit":
            return <CreateHabitModal {...modalProps} />;

        case "editHabit":
            return <EditHabitModal {...modalProps} />;

        case "viewHabit":
            return <ViewHabitModal {...modalProps} />;

        default:
            return null;
    }
}
