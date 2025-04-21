"use client";
import React from "react";
import styles from "./CategoryList.module.scss";
import CategoryItem from "./CategoryItem";
import { AdminCategory } from "@/hooks/useAdminCategories";

type CategoryListProps = {
    categories: AdminCategory[];
    deleteCategory: (id: number) => void;
    updateCategory: (id: number, name: string) => void;
};

export default function CategoryList({
    categories,
    deleteCategory,
    updateCategory,
}: CategoryListProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.index}>
                <span>카테고리명</span>
                <span>현재 사용량</span>
                <span>관리</span>
            </div>

            <ul className={styles.list}>
                {categories?.map((category) => (
                    <CategoryItem
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        habitCount={category.habitCount}
                        handleDelete={deleteCategory}
                        handleUpdate={updateCategory}
                    />
                ))}
            </ul>
        </div>
    );
}
