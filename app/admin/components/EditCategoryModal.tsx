"use client";

import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./EditCategoryModal.module.scss";

type EditCategoryModalProps = {
    id: number;
    name: string;
    handleUpdate: (id: number, name: string) => void;
};

export default function EditCategoryModal({
    id,
    name,
    handleUpdate,
}: EditCategoryModalProps) {
    const { isOpen, closeModal } = useModalStore();
    const [input, setInput] = useState<string>(name);
    const [count, setCount] = useState<number>(name.length);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input) {
            alert("카테고리 이름을 입력해주세요."); // 추후 토스트로 처리
            return;
        }

        if (input !== name) handleUpdate(id, input);
        closeModal();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 4) return;

        setInput(e.target.value);
        setCount(e.target.value.length);
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <div className={styles.container}>
                <h2 className={styles.title}>카테고리 수정</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label>
                            <span className={styles.name}>카테고리명</span>
                            <span className={styles.count}>{`${count}/4`}</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={input}
                            placeholder="카테고리 이름을 입력해주세요."
                            onChange={handleInputChange}
                        />
                    </div>
                    <button>수정</button>
                </form>
            </div>
        </ModalWrapper>
    );
}
