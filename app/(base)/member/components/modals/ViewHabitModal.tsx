"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import styles from "./ViewHabitModal.module.scss";
import { useAuthStore } from "@/stores/authStore";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";

type ViewHabitModalProps = {
    id: number;
    name: string;
    description: string;
};

export default function ViewHabitModal(props: ViewHabitModalProps) {
    const { isOpen, closeModal } = useModalStore();

    const [dates, setDates] = useState<Date[]>([]);

    const { token } = useAuthStore();

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const res = await fetch(`/api/members/records/${props.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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
                <h2>{props.name}</h2>
                <div className={styles.description}>{props.description}</div>
                <Calendar
                    formatDay={(locale, date) => String(date.getDate())}
                    calendarType="gregory"
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={false}
                />
            </div>
        </ModalWrapper>
    );
}
