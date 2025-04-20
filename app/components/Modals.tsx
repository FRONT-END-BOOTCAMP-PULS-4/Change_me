import useModalStore from "@/stores/modalStore";

export default function Modals() {
    const { modalType, isOpen, closeModal } = useModalStore();

    if (!isOpen) return null;

    switch (modalType) {
        case "createCategory":
            return;

        case "createHabit":
            return;

        case "editHabit":
            return;

        case "viewHabit":
            return;

        default:
            return null;
    }
}
