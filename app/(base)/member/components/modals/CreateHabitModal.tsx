"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import React from "react";

export default function CreateHabitModal() {
    const { isOpen, closeModal } = useModalStore();

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <div>습관 추가 </div>
        </ModalWrapper>
    );
}
