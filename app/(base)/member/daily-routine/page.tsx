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
        <>
            <TestHabitList />

            <TestCreateHabitModal />
        </>
    );
}
