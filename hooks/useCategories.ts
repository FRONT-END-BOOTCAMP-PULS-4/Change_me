import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export type Category = {
    id: number;
    name: string;
};
export type ResponseType = {
    categories: Category[];
};

export const useCategories = (popular?: boolean) => {
    const getUrl = `/api/categories${popular && `?popular=${popular}`}`;

    const { data, error, isLoading } = useSWR<ResponseType>(getUrl, fetcher, {
        refreshInterval: 1000 * 60 * 60 * 24,
    });

    return {
        categories: data?.categories || [],
        isLoading,
        error,
    };
};
