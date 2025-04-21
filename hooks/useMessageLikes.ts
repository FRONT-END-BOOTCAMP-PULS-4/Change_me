import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useMessageLikes = () => {
    // no mutate, check if the request is successfully loaded
    // UI will be locally changed to reduce meaningless reloads
    const { data, error, isLoading } = useSWR("api/members/likes", fetcher);

    const createMessageLike = async (messageId: number) => {
        await fetcher("/api/members/likes", {
            method: "POST",
            body: { messageId: messageId },
        });
    };

    const deleteMessageLike = async (id: number) => {
        await fetcher(`/api/members/likes/${id}`, {
            method: "DELETE",
        });
    };

    return {
        isLoading,
        error,
        createMessageLike,
        deleteMessageLike,
    };
};
