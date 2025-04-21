"use client";

import useModalStore from "@/stores/modalStore";
import CreateCategoryModal from "../admin/components/CreateCategoryModal";
import CreateHabitModal from "../(base)/member/components/modals/CreateHabitModal";
import EditHabitModal from "../(base)/member/components/modals/EditHabitModal";
import ViewHabitModal from "../(base)/member/components/modals/ViewHabitModal";
import EditCategoryModal from "../admin/components/EditCategoryModal";

export default function Modals() {
    const { modalType, isOpen, modalProps } = useModalStore();

    if (!isOpen) return null;

    switch (modalType) {
        case "createCategory":
            return <CreateCategoryModal {...modalProps} />;

        case "editCategory":
            return <EditCategoryModal {...modalProps} />;

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
