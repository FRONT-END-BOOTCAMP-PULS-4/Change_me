"use client";

import { Category } from "@/hooks/useCategories";
import React from "react";
import styles from "./CategoryFilter.module.scss";

type CategoryFilterProps = {
    selected: number;
    categories: Category[];
    handleCategoryChange: (id: number) => void;
};

export default function CategoryFilter({
    selected,
    categories,
    handleCategoryChange,
}: CategoryFilterProps) {
    categories = [{ id: -1, name: "전체" }, ...categories];
    return (
        <ul className={styles.filter}>
            {categories.map((category) => (
                <li
                    key={category.id}
                    className={`${selected === category.id && styles.selected} ${styles.item}`}
                    onClick={() => handleCategoryChange(category.id)}
                >
                    {category.name}
                </li>
            ))}
        </ul>
    );
}
