"use client";

import { useEffect, useState } from "react";
import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import { useAuthStore } from "@/stores/authStore";
import styles from "./TestCreateHabitModal.module.scss";

export default function TestCreateHabitModal() {
    const { isOpen, closeModal, modalType, modalProps } = useModalStore();
    const isEdit = modalType === "habit";
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
            const isEditMode = modalProps?.habit;

            if (isEditMode) {
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

        const method = isEditMode ? "PATCH" : "POST";
        const url = isEditMode
            ? `/api/members/test-habits/${modalProps.habit.id}`
            : `/api/members/test-habits`;

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
                alert(isEditMode ? "습관이 수정되었습니다." : "습관이 등록되었습니다.");
                closeModal();
                refetchHabits?.();
            } else {
                alert(data.error || (isEditMode ? "습관 수정 실패" : "습관 등록 실패"));
            }
        } catch (error) {
            console.error("요청 실패:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <div className={styles.container}>
                <h2 className={styles.title}>{isEditMode ? "습관 수정" : "습관 추가"}</h2>
                <form className={styles.form} onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    {/* 카테고리 선택 */}
                    <div className={styles.field}>
                        <label>카테고리</label>
                        <select
                            value={categoryId ?? ""}
                            onChange={(e) =>
                                setCategoryId(e.target.value === "" ? null : Number(e.target.value))
                            }
                            disabled={isEditMode}
                        >
                            <option value="">카테고리를 선택하세요.</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 습관명 */}
                    <div className={styles.field}>
                        <label>
                            습관명 <span className={styles.count}>{name.length}/10</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                if (e.target.value.length <= 10) {
                                    setName(e.target.value);
                                }
                            }}
                            disabled={isEditMode}
                            placeholder="어떤 습관을 추가하실 건가요?"
                        />
                    </div>

                    {/* 설명 */}
                    <div className={styles.field}>
                        <label>
                            설명 <span className={styles.count}>{description.length}/100</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => {
                                if (e.target.value.length <= 100) {
                                    setDescription(e.target.value);
                                }
                            }}
                            placeholder="실천 방법을 구체적으로 작성해보세요."
                        />
                    </div>

                    {/* 종료일 */}
                    <div className={styles.field}>
                        <label>종료일</label>
                        <input
                            type="date"
                            value={finishedAt}
                            min={(() => {
                                const today = new Date();

                                const startAt = isEditMode && modalProps?.habit?.startAt
                                    ? new Date(modalProps.habit.startAt)
                                    : new Date();

                                const startLimit = new Date(startAt);
                                startLimit.setDate(startLimit.getDate() + 14);

                                const finalMin = startLimit > today ? startLimit : today;

                                return finalMin.toISOString().split("T")[0];
                            })()}
                            onChange={(e) => setFinishedAt(e.target.value)}
                            placeholder="종료일을 입력하세요."
                        />
                    </div>

                    {/* 버튼 */}
                    <button type="submit">
                        {isEditMode ? "수정" : "추가"}
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}