"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import React from "react";

export default function CreateCategoryModal() {
    const { isOpen, closeModal } = useModalStore();

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <div>카테고리 추가 모달</div>
        </ModalWrapper>
    );
}
