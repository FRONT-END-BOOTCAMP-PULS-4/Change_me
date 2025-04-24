"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import styles from "./ViewHabitModal.module.scss";
import { useAuthStore } from "@/stores/authStore";

type ViewHabitModalProps = {
    habitId: number;
    habitName: string;
    habitDescrition: string;
};

export default function ViewHabitModal(props: ViewHabitModalProps) {
    const { isOpen, closeModal } = useModalStore();

    const [dates, setDates] = useState<Date[]>([]);

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const res = await fetch(
                    `/api/members/records/${props.habitId}`,
                );
                const data = await res.json();
                if (Array.isArray(data.dates)) {
                    setDates(data.dates);
                }
            } catch (error) {
                console.error("습관 기록 불러오기 실패:", error);
            }
        };
        fetchDates();
    }, []);

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <div className={styles.wrapper}>
                <h2>{props.habitName}</h2>
                <div className={styles.description}>
                    {props.habitDescrition}
                </div>
                <Calendar
                    formatDay={(locale, date) => moment(date).format("DD")} // should be changed
                    calendarType="gregory"
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={false}
                />
            </div>
        </ModalWrapper>
    );
}
