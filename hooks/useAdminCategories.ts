import { fetcher } from "@/utils/fetcher";
import useSWR, { mutate } from "swr";

export type AdminCategory = {
    id: number;
    name: string;
    habitCount: number;
};

export type ResponseType = {
    categories: AdminCategory[];
    endPage: number;
    pages: number[];
    totalCount: number;
};

export const useAdminCategories = (currentPage: number) => {
    const getUrl = `/api/admin/categories?currentPage=${currentPage}`;

    const { data, error, isLoading } = useSWR<ResponseType>(getUrl, fetcher);

    const createCategory = async (category: Pick<AdminCategory, "name">) => {
        await fetcher("/api/admin/categories", {
            method: "POST",
            body: category,
        });
        mutate(getUrl);
    };

    const updateCategory = async (id: number, name: string) => {
        await fetcher(`/api/admin/categories/${id}`, {
            method: "PATCH",
            body: { name },
        });
        mutate(getUrl);
    };

    const deleteCategory = async (id: number) => {
        await fetcher(`/api/admin/categories/${id}`, {
            method: "DELETE",
        });
        mutate(getUrl);
    };

    return {
        categories: data?.categories || [],
        totalCount: data?.totalCount || 0,
        endPage: data?.endPage || 1,
        pages: data?.pages || [],
        isLoading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};
