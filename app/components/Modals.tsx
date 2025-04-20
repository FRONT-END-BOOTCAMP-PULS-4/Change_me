"use client";

import useModalStore from "@/stores/modalStore";
import CreateCategoryModal from "../admin/components/CreateCategoryModal";
import CreateHabitModal from "../(base)/member/components/modals/CreateHabitModal";
import EditHabitModal from "../(base)/member/components/modals/EditHabitModal";
import ViewHabitModal from "../(base)/member/components/modals/ViewHabitModal";

export default function Modals() {
    const { modalType, isOpen } = useModalStore();

    if (!isOpen) return null;

    switch (modalType) {
        case "createCategory":
            return <CreateCategoryModal />;

        case "createHabit":
            return <CreateHabitModal />;

        case "editHabit":
            return <EditHabitModal />;

        case "viewHabit":
            return <ViewHabitModal />;

        default:
            return null;
    }
}
