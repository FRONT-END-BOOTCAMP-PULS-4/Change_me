"use client";
import useModalStore from "@/stores/modalStore";
import React from "react";
import TestCreateHabitModal from "../components/modals/TestCreateHabitModal";
import TestHabitList from "./components/TestHabitList";

export default function page() {
    const { openModal } = useModalStore();

    const handleOpenModal = () => {
        openModal("createHabit");
    };
    return (
        <div>
            <h1>오늘의 루틴</h1>

            <TestHabitList />

            <TestCreateHabitModal />
        </div>
    );
}
