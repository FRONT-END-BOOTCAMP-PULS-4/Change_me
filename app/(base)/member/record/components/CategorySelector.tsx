import { useEffect, useState } from 'react';
import styles from './CategorySelector.module.scss';

interface Category {
    id: number;
    name: string;
}

interface CategorySelectorProps {
    selectedCategory: number | null;
    onCategoryChange: (categoryId: number | null) => void;
}

export default function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data.categories);
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