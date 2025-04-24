"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import React from "react";
import Calendar from "react-calendar";
import styles from "./ViewHabitModal.module.scss";
import { useAuthStore } from "@/stores/authStore";

type ViewHabitModalProps = {
    habitId: number;
};

export default function ViewHabitModal(props: ViewHabitModalProps) {
    const { isOpen, closeModal } = useModalStore();
    const { token } = useAuthStore();

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <div className={styles.wrapper}>
                <h2>{}</h2>
                <div className={styles.description}>{}</div>
                <Calendar />
            </div>
        </ModalWrapper>
    );
}
