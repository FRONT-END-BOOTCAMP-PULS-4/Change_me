import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export type AnonHabit = {
    id: number;
    userNickname: string;
    imageUrl: string | null;
    isActive: boolean;
    habitName: string;
    description: string;
};

export type ResponseType = {
    totalCount: number;
    ongoingCount: number;
    successCount: number;
    failureCount: number;
    habits: AnonHabit[];
};

export const useAnonHabits = (categoryId?: number) => {
    const getUrl = `/api/habits${categoryId === -1 ? "" : `?categoryId=${categoryId}`}`;
    console.log(getUrl);
    const { data, isLoading, error } = useSWR<ResponseType>(getUrl, fetcher);

    return {
        countInfo: {
            totalCount: data?.totalCount || 0,
            ongoingCount: data?.ongoingCount || 0,
            successCount: data?.successCount || 0,
            failureCount: data?.failureCount || 0,
        },
        habits: data?.habits || [],
        isLoading,
        error,
    };
};
