"use client";
import { useEffect, useState } from 'react';
import { useAuthStore } from "@/stores/authStore";
import { useCategories } from '@/hooks/useCategories';
import { Category } from '@/hooks/useCategories';

// import { useHabit } from '@/hooks/useHabit';
import styles from './CategorySelector.module.scss';

// useEffact?
// useState?
// 이게 뭐야
// useEffect는 React의 훅으로, 컴포넌트가 렌더링된 후 특정 작업을 수행할 수 있게 해줍니다.
// useState는 컴포넌트의 상태를 관리하는 훅입니다.
// useState를 사용하면 컴포넌트의 상태를 선언하고, 그 상태가 변경될 때마다 컴포넌트를 다시 렌더링할 수 있습니다.
// useState는 배열을 반환하는데, 첫 번째 요소는 현재 상태의 값이고, 두 번째 요소는 상태를 업데이트하는 함수입니다.
// useRouter는 Next.js의 라우팅 기능을 사용하기 위한 훅입니다.
// useRouter는 현재 라우터 객체에 접근할 수 있게 해주고, useSearchParams는 URL의 쿼리 파라미터를 쉽게 다룰 수 있게 해줍니다.

type CategorySelectorProps = { // 카테고리 선택 컴포넌트 Props //usestate사용하면 필요없나?
    // 내부 컴포넌트에서만 변경내용이 사용되면 필요없음음
    selectedId: number; // 선택된 카테고리 ID 
    categories: Category[]; // 카테고리 목록
    handleCategoryChange: (id: number) => void; // 카테고리 변경 핸들러 : 아이디 변경시 부모 페이지한테 전달
}




export default function CategorySelector() { // 카테고리 선택 컴포넌트
    const [categories, setCategories] = useState<{id : number; name : string }[]>([]);
    // categories : 카테고리 목록
    // setCategories : 카테고리 목록을 설정하는 함수 
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null); 
    // setselectedCategoryId : 카테고리 선택시 부모 페이지한테 전달
    // selectedCategoryId : 선택된 카테고리 아이디
    //
    const token = useAuthStore.getState().token;

    useEffect(() => { // 컴포넌트가 마운트될 때 카테고리 목록을 가져오는 비동기 함수
        // 비동기 함수 정의
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                const data = await response.json(); // api에서 json형태로 반환환
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
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
        >
            <option value="">전체 카테고리</option>
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
