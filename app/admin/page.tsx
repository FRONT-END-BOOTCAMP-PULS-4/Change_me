"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CategoryList from "./components/CategoryList";
import Title from "./components/Title";
import styles from "./page.module.scss";
import { useAdminCategories } from "@/hooks/useAdminCategories";
import Loading from "../components/Loading";
import Pager from "../components/Pager";
import { useToastStore } from "@/stores/toastStore";

export default function AdminPage() {
    const serachParams = useSearchParams();
    const router = useRouter();
    const currentPage = Number(serachParams.get("currentPage")) || 1;
    const { show } = useToastStore();

    const {
        categories,
        pages,
        endPage,
        isLoading,
        error,
        createCategory,
        deleteCategory,
        updateCategory,
    } = useAdminCategories(currentPage);

    const handlePageChange = (page: number) => {
        router.push(`?currentPage=${page}`);
    };

    if (isLoading) return <Loading />;
    if (error) {
        show(error);
    }

    return (
        <section className={styles.admin}>
            <Title createCategory={(name: string) => createCategory(name)} />
            <CategoryList
                categories={categories}
                deleteCategory={(id: number) => deleteCategory(id)}
                updateCategory={(id: number, name: string) =>
                    updateCategory(id, name)
                }
            />
            <Pager
                currentPage={currentPage}
                pages={pages}
                endPage={endPage}
                onPageChange={(page: number) => handlePageChange(page)}
            />
        </section>
    );
}
