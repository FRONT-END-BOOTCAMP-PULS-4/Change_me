'use client';
import { Category } from '@/hooks/useCategories';
import React, { useEffect, useState } from 'react';


type CategorySelectorProps = {
    onCategoryChange: (categoryId: number | null) => void;
}

export default function CategorySelector({ onCategoryChange }: CategorySelectorProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) throw new Error('카테고리 로드 실패');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('카테고리 로드 중 오류:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value === '' ? null : Number(e.target.value);
        setSelectedCategory(categoryId);
        onCategoryChange(categoryId);
    };

    return (
        <select 
            value={selectedCategory === null ? '' : selectedCategory} 
            onChange={handleCategoryChange}
            className="category-selector"
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