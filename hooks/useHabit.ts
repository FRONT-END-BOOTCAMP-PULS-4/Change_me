import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export type Habit = {
    id: number;
    categoryname: string;
    name: string;
    description: string;
    createdAt: string;
    finishedAt: string;
    stoppedAt: string;
    duration: string;
    rate: number;
};

export type ResponseType = {
    habits: Habit[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
};

export const useHabit = (currentPage: number) => {
    const getUrl = `/api/habits?currentPage=${currentPage}`;
    const { data, error, isLoading } = useSWR<ResponseType>(getUrl, fetcher);
    return {
        habits: data?.habits || [],
        totalCount: data?.totalCount || 1,
        currentPage: data?.currentPage || 1,
        totalPages: data?.totalPages || 1,
        isLoading,
        error,
    };
};
