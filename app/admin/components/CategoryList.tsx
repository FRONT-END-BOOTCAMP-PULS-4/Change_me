"use client";
import Pager from "@/app/components/Pager";
import React from "react";
import styles from "./CategoryList.module.scss";
import CategoryItem from "./CategoryItem";

const categories = [
    { id: 1, name: "운동", habitCount: 0 },
    { id: 2, name: "공부", habitCount: 10000000 },
    { id: 3, name: "생활습관", habitCount: 532 },
];

export default function CategoryList() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.index}>
                <span>카테고리명</span>
                <span>현재 사용량</span>
                <span>관리</span>
            </div>

            <ul className={styles.list}>
                {categories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        name={category.name}
                        habitCount={category.habitCount}
                    />
                ))}
            </ul>
            <Pager
                currentPage={1}
                pages={[1, 2, 3, 4, 5]}
                endPage={10}
                onPageChange={(page: number) => {}}
            />
        </div>
    );
}
