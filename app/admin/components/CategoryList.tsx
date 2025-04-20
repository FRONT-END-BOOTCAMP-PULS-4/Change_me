"use client";
import Pager from "@/app/components/Pager";
import React from "react";
import styles from "./CategoryList.module.scss";
import CategoryItem from "./CategoryItem";
import { useAdminCategories } from "@/hooks/useAdminCategories";
import Loading from "@/app/components/Loading";
import { useSearchParams, useRouter } from "next/navigation";

export default function CategoryList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(searchParams.get("page")) || 1;

    const { categories, pages, endPage, isLoading, error } =
        useAdminCategories(currentPage);

    const handlePageChange = (page: number) => {
        router.push(`?page=${page}`);
    };

    if (isLoading) return <Loading />;

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
                        name={category.name}
                        habitCount={category.habitCount}
                    />
                ))}
            </ul>
            <Pager
                currentPage={1}
                pages={pages}
                endPage={endPage}
                onPageChange={(page: number) => handlePageChange(page)}
            />
        </div>
    );
}
