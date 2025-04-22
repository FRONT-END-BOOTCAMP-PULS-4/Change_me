"use client";

import { useEffect, useState } from "react";
import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import { useAuthStore } from "@/stores/authStore";

export default function TestCreateHabitModal() {
    const { isOpen, closeModal, modalType, modalProps } = useModalStore();
    const isEdit = modalType === "editHabit";
    const token = useAuthStore.getState().token;

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [finishedAt, setFinishedAt] = useState("");

    const isEditMode = modalProps && modalProps.habit;
    const refetchHabits = modalProps?.refetchHabits;

    // 카테고리 목록 가져오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                }
            } catch (error) {
                console.error("카테고리 불러오기 실패:", error);
            }
        };
        fetchCategories();
    }, []);

    // 모달이 열릴 때 초기값 설정 (등록/수정 모드 구분)
    useEffect(() => {
        if (isOpen) {
            if (modalType === "editHabit" && modalProps) {
                setCategoryId(Number(modalProps.habit.categoryId));
                setName(modalProps.habit.name);
                setDescription(modalProps.habit.description);
                setFinishedAt(modalProps.habit.finishedAt);
            } else {
                setCategoryId(null);
                setName("");
                setDescription("");
                setFinishedAt("");
            }
        }
    }, [isOpen, modalType, modalProps]);

    const handleSubmit = async () => {
        if (categoryId === null || !name.trim() || !finishedAt.trim()) {
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }

        const method = isEdit ? "PATCH" : "POST";
        const url = isEdit
            ? `/api/test-habits/${modalProps.habit.id}`
            : `/api/test-habits`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    categoryId,
                    name,
                    description,
                    finishedAt,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                alert(isEdit ? "습관이 수정되었습니다." : "습관이 등록되었습니다.");
                closeModal();
                refetchHabits?.();
            } else {
                alert(data.error || (isEdit ? "습관 수정 실패" : "습관 등록 실패"));
            }
        } catch (error) {
            console.error("요청 실패:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <h3>{isEditMode ? "습관 수정" : "습관 등록"}</h3>
            <div>
                <label>카테고리</label>
                <select
                    value={categoryId ?? ""}
                    onChange={(e) =>
                        setCategoryId(e.target.value === "" ? null : Number(e.target.value))
                    }
                    disabled={isEditMode}
                >
                    <option value="">카테고리를 선택하세요</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>습관명</label>
                <small>{name.length}/10</small>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        if (e.target.value.length <= 10) {
                            setName(e.target.value);
                        }
                    }}
                    disabled={isEditMode}
                />
            </div>

            <div>
                <label>설명</label>
                <small>{description.length}/100</small>
                <textarea
                    value={description}
                    onChange={(e) => {
                        if (e.target.value.length <= 100) {
                            setDescription(e.target.value);
                        }
                    }}
                />
            </div>

            <div>
                <label>종료일</label>
                <input
                    type="date"
                    value={finishedAt}
                    min={(() => {
                        const baseDate = isEditMode
                            ? new Date(modalProps.habit.startAt) // 수정 시: 시작일 기준
                            : new Date();                       // 등록 시: 오늘 기준                        

                        baseDate.setDate(baseDate.getDate() + 14); // 14일 이후부터
                        return baseDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식
                    })()}
                    onChange={(e) => setFinishedAt(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit}>{isEditMode ? "수정" : "등록"}</button>
        </ModalWrapper>
    );
}