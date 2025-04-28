import { useToastStore } from "@/stores/toastStore";
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
};

export const useAdminCategories = (currentPage: number) => {
    const { show } = useToastStore();
    const getUrl = `/api/admin/categories?currentPage=${currentPage}`;

    const { data, error, isLoading } = useSWR<ResponseType>(getUrl, fetcher, {
        refreshInterval: 1000 * 60 * 60,
    });

    const createCategory = async (name: string) => {
        try {
            await fetcher("/api/admin/categories", {
                method: "POST",
                body: { name },
            });
            mutate(getUrl);
        } catch (error) {
            if (error instanceof Error) {
                show(error.message);
            }
        }
    };

    const updateCategory = async (id: number, name: string) => {
        try {
            await fetcher(`/api/admin/categories/${id}`, {
                method: "PATCH",
                body: { name },
            });
            show("카테고리 이름이 수정되었습니다.");
            mutate(getUrl);
        } catch (error) {
            if (error instanceof Error) {
                show(error.message);
            }
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            await fetcher(`/api/admin/categories/${id}`, {
                method: "DELETE",
            });
            show("카테고리가 삭제되었습니다.");
            mutate(getUrl);
        } catch (error) {
            if (error instanceof Error) {
                show(error.message);
            }
        }
    };

    return {
        categories: data?.categories || [],
        endPage: data?.endPage || 1,
        pages: data?.pages || [],
        isLoading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};
