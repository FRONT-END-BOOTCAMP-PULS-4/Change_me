import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export type Category = {
    id: number;
    name: string;
};
export type ResponseType = {
    categories: Category[];
};

export const useCategories = (popular?: string) => {
    const getUrl = `/api/categories${popular && `?popular=${popular}`}`;

    const { data, error, isLoading } = useSWR<ResponseType>(getUrl, fetcher);

    return {
        categories: data?.categories || [],
        isLoading,
        error,
    };
};
