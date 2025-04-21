"use client";

import { useEffect, useState } from "react";
import ModalWrapper from "@/app/components/ModalWrapper";
import useModalStore from "@/stores/modalStore";
import { useAuthStore } from "@/stores/authStore";

export default function TestCreateHabitModal() {
    const { isOpen, closeModal } = useModalStore();

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [finishedAt, setFinishedAt] = useState("");

    const token = useAuthStore.getState().token;

    // 카테고리 목록 가져오기
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();

                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                } else {
                    console.error("카테고리 배열이 존재하지 않습니다:", data);
                }
            } catch (error) {
                console.error("카테고리 불러오기 실패:", error);
            }
        };
        fetchCategories();
    }, []);

    // 모달이 열릴 때 입력값 초기화
    useEffect(() => {
        if (isOpen) {
            setCategoryId(null)
            setName("");
            setDescription("");
            setFinishedAt("");
        }
    }, [isOpen]);

    // 등록
    const handleSubmit = async () => {
        if (categoryId === null || !name.trim() || !finishedAt.trim()) {
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }

        try {
            const res = await fetch("/api/test-habits", {
                method: "POST",
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
                alert("습관이 성공적으로 등록되었습니다.");
                closeModal();
            } else {
                alert(data.error || "습관 등록 실패");
            }
        } catch (error) {
            console.error(error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={closeModal}>
            <h3>습관 등록</h3>
            <div>
                <label>카테고리</label>
                <select
                    value={categoryId ?? ""}
                    onChange={(e) => {
                        const selected = e.target.value;
                        setCategoryId(selected === "" ? null : Number(selected));
                    }}
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
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>설명</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label>종료일</label>
                <input
                    type="date"
                    value={finishedAt}
                    onChange={(e) => setFinishedAt(e.target.value)}
                />
            </div>

            <button onClick={handleSubmit}>등록</button>
        </ModalWrapper>
    );
}