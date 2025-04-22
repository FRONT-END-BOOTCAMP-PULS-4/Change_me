"use client";

import CategoryFilter from "./components/CategoryFilter";
import TopSection from "./components/TopSection";
import BottomSection from "./components/BottomSection";
import { useCategories } from "@/hooks/useCategories";
import Loading from "../components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useAnonHabits } from "@/hooks/useAnonHabits";
import styles from "./page.module.scss";

export default function page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const test = searchParams.get("categoryId");
    console.log(test);
    const categoryId =
        searchParams.get("categoryId") !== null
            ? Number(searchParams.get("categoryId"))
            : -1;

    const { categories, isLoading: isCategoryLoading } = useCategories(true);
    const {
        countInfo,
        habits,
        isLoading: isHabitLoading,
    } = useAnonHabits(categoryId);

    const handleCategoryChange = (id: number) => {
        router.push(`?categoryId=${id}`);
    };

    if (isCategoryLoading || isHabitLoading) return <Loading />;

    return (
        <div className={styles.page}>
            <CategoryFilter
                selected={categoryId}
                categories={categories}
                handleCategoryChange={handleCategoryChange}
            />
            <TopSection />
            <BottomSection />
        </div>
    );
}
