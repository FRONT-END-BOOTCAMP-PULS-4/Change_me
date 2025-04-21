import { fetcher } from "@/utils/fetcher";
import useSWR, { mutate } from "swr";

export type Message = {
    id: number;
    memberId: string;
    writer: string;
    imageUrl: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    isLiked: boolean;
    modifiedAt: Date | null;
};

export type MessageResponseType = {
    messages: Message[];
    currentPage: number;
    pages: number[];
    endPage: number;
};

export const useMessages = (currentPage: number, mine: boolean) => {
    const getUrl = `/api/members/messages?currentPage=${currentPage}&mine=${mine}`;

    const { data, error, isLoading } = useSWR<MessageResponseType>(
        "api/members/messages",
        fetcher,
    );

    const createMessage = async (content: string) => {
        await fetcher("/api/members/messages", {
            method: "POST",
            body: { content: content },
        });
        mutate(getUrl);
    };

    const updateMessage = async (id: number, content: string) => {
        await fetcher(`/api/members/messages/${id}`, {
            method: "PATCH",
            body: { content: content },
        });
        mutate(getUrl);
    };

    const deleteMessage = async (id: number) => {
        await fetcher(`/api/members/messages/${id}`, {
            method: "DELETE",
        });
        mutate(getUrl);
    };

    return {
        messages: data?.messages || [],
        currentPage: data?.currentPage || 1,
        pages: data?.pages || [],
        endPage: data?.endPage || 1,
        isLoading,
        error,
        createMessage,
        updateMessage,
        deleteMessage,
    };
};
