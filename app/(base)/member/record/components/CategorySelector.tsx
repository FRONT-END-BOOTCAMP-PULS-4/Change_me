"use client";
import { useEffect, useState } from 'react';
import { useAuthStore } from "@/stores/authStore";
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/hooks/useCategories';
import styles from './CategorySelector.module.scss';

type CategorySelectorProps = { // 카테고리 선택 컴포넌트 Props 타입 정의
    selectedId: number; // 선택된 카테고리 ID 
    categories: Category[]; // 카테고리 목록
    handleCategoryChange: (id: number) => void; // 카테고리 변경 핸들러 : 아이디 변경시 부모 페이지한테 전달
}

export default function CategorySelector() { // 카테고리 선택 컴포넌트
    const [categories, setCategories] = useState<{id : number; name : string }[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); 

    const token = useAuthStore.getState().token;

    useEffect(() => { // 컴포넌트가 마운트될 때 카테고리 목록을 가져오는 비동기 함수
        // 비동기 함수 정의
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json(); // api에서 json형태로 반환환
                if (Array.isArray(data.categories)){
                    setCategories(data.categories);
                }
            } catch (error) {
                console.error('카테고리 로드 실패:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <select 
            className={styles.selector}
            value={selectedCategoryId ?? ""}
            onChange={(e) => setSelectedCategoryId(e.target.value === "" ? null : Number(e.target.value))}
        >
            <option value="">전체</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}

// useCategories 왜 안썼지??
// useCategories를 사용하면 카테고리 목록을 가져오는 로직을 간소화할 수 있습니다.
// useCategories는 SWR을 사용하여 데이터를 가져오고 캐싱하는 훅입니다.
