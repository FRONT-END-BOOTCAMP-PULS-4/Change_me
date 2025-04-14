import { createClient } from "@/utils/supabase/Server";

import { Message } from "@/domain/entities/Message";
import { MessageFilter } from "@/domain/repositories/filters/MessageFilter";
import { MessageRepository } from "@/domain/repositories/MessageRepository";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export class SbMessageRepository implements MessageRepository {
    private queryFilter(
        filter: MessageFilter | undefined,
        query: PostgrestFilterBuilder<any, any, any[], "messages", unknown>
    ) {
        if (filter) {
            if (filter.memberId) {
                query = query.eq("member_id", filter.memberId);
            }
        }
        return query;
    }

    async count(filter?: MessageFilter): Promise<number> {
        const supabase = await createClient();

        let query = supabase.from("messages").select("*", { count: "exact" });

        query = this.queryFilter(filter, query);

        const { count, error } = await query;
        if (error) {
            throw new Error(`Failed to count messages: ${error.message}`);
        }

        return count || 0;
    }

    async findAll(filter?: MessageFilter): Promise<Message[]> {
        const supabase = await createClient();

        let query = supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false })
            .range(
                filter?.offset || 0,
                (filter?.offset || 0) + (filter?.limit || 5) - 1
            );

        query = this.queryFilter(filter, query);

        const { data } = await query;

        console.log("Fetched messages:", data);

        const messages: Message[] =
            data?.map((m) => ({
                id: m.id,
                memberId: m.member_id,
                content: m.content,
                createdAt: new Date(m.created_at),
                modifiedAt: new Date(m.modified_at),
            })) || [];

        return messages;
    }

    async findById(id: number): Promise<Message | null> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            throw new Error(`Failed to find message by ID: ${error.message}`);
        }

        if (!data) {
            return null;
        }

        return new Message(
            data.id,
            data.memberId,
            data.content,
            new Date(data.createdAt),
            new Date(data.modifiedAt)
        );
    }

    async save(message: Message): Promise<Message> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("messages")
            .insert({
                id: message.id,
                memberId: message.memberId,
                content: message.content,
            })
            .select("*")
            .single();

        if (error) {
            throw new Error(`Failed to save message: ${error.message}`);
        }

        return new Message(
            data.id,
            data.member_id,
            data.content,
            new Date(data.createdAt),
            new Date(data.modifiedAt)
        );
    }

    async update(message: Message): Promise<Message> {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("messages")
            .update({
                memberId: message.memberId,
                content: message.content,
            })
            .eq("id", message.id)
            .select("*")
            .single();

        if (error) {
            throw new Error(`Failed to update message: ${error.message}`);
        }

        return new Message(
            data.id,
            data.member_id,
            data.content,
            new Date(data.createdAt),
            new Date(data.modifiedAt)
        );
    }

    async deleteById(id: number): Promise<void> {
        const supabase = await createClient();

        const { error } = await supabase.from("messages").delete().eq("id", id);

        if (error) {
            throw new Error(
                `Failed to delete message with id ${id}: ${error.message}`
            );
        }
    }
}
