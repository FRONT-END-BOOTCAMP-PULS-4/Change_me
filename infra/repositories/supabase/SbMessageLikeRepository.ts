import { createClient } from "@/utils/supabase/Server";

import { MessageLike } from "@/domain/entities/MessageLike";
import { MessageLikeFilter } from "@/domain/repositories/filters/MessageLikeFilter";
import { MessageLikeRepository } from "@/domain/repositories/MessageLikeRepository";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export class SbMessageLikeRepository implements MessageLikeRepository {
    private queryFilter(
        filter: MessageLikeFilter | undefined,
        query: PostgrestFilterBuilder<any, any, any[], "message_like", unknown>,
    ) {
        if (filter) {
            if (filter.memberId) {
                query = query.eq("member_id", filter.memberId);
            }

            if (filter.messageId) {
                query = query.eq("message_id", filter.messageId);
            }
        }
        return query;
    }

    async count(filter?: MessageLikeFilter): Promise<number> {
        const supabase = await createClient();

        let query = supabase
            .from("message_like")
            .select("*", { count: "exact" });

        query = this.queryFilter(filter, query);

        const { count, error } = await query;
        if (error) {
            throw new Error(`Failed to count messages: ${error.message}`);
        }

        return count || 0;
    }
    async findAll(filter?: MessageLikeFilter): Promise<MessageLike[]> {
        const supabase = await createClient();

        let query = supabase.from("message_like").select("*");

        query = this.queryFilter(filter, query);

        const { data } = await query;

        console.log("Fetched messageLikes:", data);

        const messageLikes: MessageLike[] =
            data?.map((m) => ({
                messageId: m.message_id,
                memberId: m.member_id,
            })) || [];

        return messageLikes;
    }
    async save(messageLike: MessageLike): Promise<MessageLike> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("message_like")
            .insert({
                message_id: messageLike.messageId,
                member_id: messageLike.memberId,
            })
            .select("*")
            .single();

        if (error) {
            throw new Error(`Failed to save messageLike: ${error.message}`);
        }

        return new MessageLike(data.message_id, data.member_id);
    }
    async delete(messageId: number, memberId: string): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase
            .from("message_like")
            .delete()
            .eq("message_id", messageId)
            .eq("member_id", memberId);

        if (error) {
            throw new Error(
                `Failed to delete message with message_id ${messageId}, member_id ${memberId}: ${error.message}`,
            );
        }
    }
}
