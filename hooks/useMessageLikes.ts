import { fetcher } from "@/utils/fetcher";

export const useMessageLikes = () => {
    // Fetcher only, not using SWR
    // UI will be locally changed to reduce meaningless reloads
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
        createMessageLike,
        deleteMessageLike,
    };
};
