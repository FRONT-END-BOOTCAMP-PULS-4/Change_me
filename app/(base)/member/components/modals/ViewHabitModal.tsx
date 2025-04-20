"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import React from "react";

export default function ViewHabitModal() {
    const { isOpen, closeModal } = useModalStore();

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <div>습관 상세보기</div>
        </ModalWrapper>
    );
}
